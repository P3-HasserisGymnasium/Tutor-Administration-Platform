package project.backend.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByPostBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByTutorBody;
import project.backend.controller_bodies.collaboration_bodies.SubmitBody;
import project.backend.model.Collaboration;
import project.backend.model.EntityType;
import project.backend.model.CollaborationState;
import project.backend.model.Feedback;
import project.backend.model.Post;
import project.backend.model.RoleEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.Administrator;
import project.backend.repository.CollaborationRepository;
import project.backend.repository.AdministratorRepository;

@Service
public class CollaborationService {

    @Autowired
    final CollaborationRepository collaborationRepository;

    @Autowired
    final AdministratorRepository administratorRepository;

    @Autowired
    final NotificationService notificationService;

    @Autowired
    final PostService postService;

    @Autowired
    final RoleService roleService;

    public CollaborationService(CollaborationRepository collaborationRepository, RoleService roleService,
            NotificationService notificationService, AdministratorRepository administratorRepository,
            PostService postService) {
        this.collaborationRepository = collaborationRepository;
        this.roleService = roleService;
        this.notificationService = notificationService;
        this.administratorRepository = administratorRepository;
        this.postService = postService;
    }

    public Collaboration getCollaborationById(Long id) {
        Optional<Collaboration> collaboratOpt = collaborationRepository.findById(id);

        return collaboratOpt.orElse(null);
    }

    public ArrayList<Collaboration> getCollaborationsWithTutor(Long tutorId) {
        return collaborationRepository.findCollaborationsWithTutorId(tutorId);
    }

    public ArrayList<Collaboration> getCollaborationsWithTutee(Long tuteeId) {
        return collaborationRepository.findCollaborationsWithTuteeId(tuteeId);
    }

    public List<Collaboration> getAllCollaborations() {
        return collaborationRepository.findAll();
    }

    public List<Collaboration> getCollaborationsAwaitingAcceptance() {
        return collaborationRepository.findByWaitingForAdmin();
    }

    public Collaboration createCollaboration(CollaborationCreateBody body) {

        Collaboration collaboration = new Collaboration();

        collaboration.setStartTimestamp(body.start_date);
        collaboration.setEndTimestamp(body.end_date);

        collaboration.setTutor(roleService.getTutorByUserId(body.tutor_id));
        collaboration.setTutee(roleService.getTuteeById(body.tutee_id));

        collaboration.setState(body.state);

        collaboration.setSubject(body.subject);

        return collaborationRepository.save(collaboration);
    }

    public void deleteCollaborationById(Long id) {
        collaborationRepository.deleteById(id);
    }


    // admin provides collaboration suggestion
    public void submitCollaborationSuggestion(SubmitBody body) {


        Collaboration collaboration = new Collaboration();
        collaboration.setTutee(roleService.getTuteeById(body.getTutee_id()));
        collaboration.setTutor(roleService.getTutorById(body.getTutor_id()));
        collaboration.setSubject(body.getSubject());
        collaboration.setState(CollaborationState.WAITING_FOR_BOTH);
        collaboration.setAdminAccepted(true);
        Collaboration collab = collaborationRepository.save(collaboration);

        Post post = postService.getPostById(body.getPost_id()).get();
        post.setPairingRequest(false);
        postService.savePost(post);


        notificationService.sendNotification(0L, EntityType.ADMIN, body.getTutee_id(), EntityType.TUTEE,
                collab.getId(), EntityType.COLLABORATION);

        collaborationRepository.save(collaboration);
    }

    public void acceptCollaboration(Long collaborationId, RoleEnum role, AuthenticatedUserBody authenticatedUser) {

        Collaboration collaboration = getCollaborationById(collaborationId);
        CollaborationState state = collaboration.getState();
        boolean adminAccepted = collaboration.getAdminAccepted();
        Long senderId = null;
        EntityType senderType = null;
        Long receiverId = null;
        EntityType receiverType = null;
        switch (role) {
            case Tutee:
                if (state != CollaborationState.WAITING_FOR_TUTEE && state != CollaborationState.WAITING_FOR_BOTH) {
                    throw new IllegalArgumentException("Collaboration is not waiting for tutee");
                }
                if (adminAccepted && state == CollaborationState.WAITING_FOR_TUTEE) {
                    collaboration.setState(CollaborationState.ESTABLISHED);
                    senderId = collaboration.getTutee().getId();
                    receiverId = collaboration.getTutor().getId();
                    senderType = EntityType.TUTEE;
                    receiverType = EntityType.TUTOR;
                } else if (state == CollaborationState.WAITING_FOR_BOTH) {
                    collaboration.setState(CollaborationState.WAITING_FOR_TUTOR);
                    senderId = collaboration.getTutee().getId();
                    senderType = EntityType.TUTEE;
                    receiverId = collaboration.getTutor().getId();
                    receiverType = EntityType.TUTOR;
                }
                else {
                    collaboration.setState(CollaborationState.WAITING_FOR_ADMIN);
                    senderId = collaboration.getTutee().getId();
                    senderType = EntityType.TUTEE;
                }
                break;
            case Tutor:
                if (state != CollaborationState.WAITING_FOR_TUTOR) {
                    throw new IllegalArgumentException("Collaboration is not waiting for tutor");
                }
                if (adminAccepted) {
                    collaboration.setState(CollaborationState.ESTABLISHED);
                    senderId = collaboration.getTutor().getId();
                    receiverId = collaboration.getTutee().getId();
                    senderType = EntityType.TUTOR;
                    receiverType = EntityType.TUTEE;
                } else {
                    collaboration.setState(CollaborationState.WAITING_FOR_ADMIN);
                    senderId = collaboration.getTutor().getId();
                    senderType = EntityType.TUTOR;
                }
                break;
            case Administrator:
                if (state != CollaborationState.WAITING_FOR_ADMIN) {
                    throw new IllegalArgumentException("Collaboration is not waiting for admin");
                }
                if (adminAccepted) {
                    collaboration.setState(CollaborationState.WAITING_FOR_BOTH);
                } else {
                    collaboration.setAdminAccepted(true);
                    collaboration.setState(CollaborationState.ESTABLISHED);
                    break;
                }
        }

        if (senderId == null && receiverId == null)

        {
            notificationService.sendNotification(authenticatedUser.getAdministratorId(), EntityType.ADMIN,
                    collaboration.getTutee().getId(), EntityType.TUTEE, collaborationId, EntityType.COLLABORATION);
            notificationService.sendNotification(authenticatedUser.getAdministratorId(), EntityType.ADMIN,
                    collaboration.getTutor().getId(), EntityType.TUTOR, collaborationId, EntityType.COLLABORATION);
        }

        if (senderId != null && receiverId != null) {
            notificationService.sendNotification(senderId, senderType, receiverId, receiverType,
                    collaborationId,
                    EntityType.COLLABORATION);
        }
        try {
            collaborationRepository.save(collaboration);
        } catch (Exception e) {
            throw new IllegalArgumentException("Collaboration does not exist");
        }

    }

    public void acceptCollaborationByPost(SubjectEnum post_subject, Long tutorId, AuthenticatedUserBody authenticatedUser){
        

        Collaboration collaboration = collaborationRepository.findByTuteeTutorAndSubject(authenticatedUser.getTuteeId(), tutorId, post_subject).get(0);

        if (collaboration.getState() != CollaborationState.WAITING_FOR_TUTEE) {
            throw new IllegalArgumentException("Collaboration is not waiting for tutee");
        }
        if (collaboration.getAdminAccepted()) {
            collaboration.setState(CollaborationState.ESTABLISHED);
            notificationService.sendNotification(authenticatedUser.getTuteeId(), EntityType.TUTEE, tutorId, EntityType.TUTOR, collaboration.getId(), EntityType.COLLABORATION);
        } else {
            collaboration.setState(CollaborationState.WAITING_FOR_ADMIN);
            notificationService.sendNotification(authenticatedUser.getTuteeId(), EntityType.TUTEE, 0L, EntityType.ADMIN, collaboration.getId(), EntityType.COLLABORATION);
        }
    }



    public void rejectCollaboration(Long collaborationId, RoleEnum role, AuthenticatedUserBody authenticatedUser){
        Collaboration collaboration = getCollaborationById(collaborationId);

        Long tuteeId = collaboration.getTutee().getId();
        Long tutorId = collaboration.getTutor().getId();
        CollaborationState state = collaboration.getState();
        switch (role) {
            case Tutee -> {
                if (state != CollaborationState.WAITING_FOR_TUTEE) {
                    throw new IllegalArgumentException("Collaboration is not waiting for tutee");
                }
                collaboration.setState(CollaborationState.REJECTED);
                notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR,
                        collaborationId, EntityType.COLLABORATION);
            }
            case Tutor -> {
                if (state != CollaborationState.WAITING_FOR_TUTOR) {
                    throw new IllegalArgumentException("Collaboration is not waiting for tutor");
                }
                collaboration.setState(CollaborationState.REJECTED);
                notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE,
                        collaborationId, EntityType.COLLABORATION);
            }
            case Administrator -> {
                if (state != CollaborationState.WAITING_FOR_ADMIN) {
                    throw new IllegalArgumentException("Collaboration is not waiting for admin");
                }
                collaboration.setState(CollaborationState.REJECTED);
                notificationService.sendNotification(authenticatedUser.getAdministratorId(), EntityType.ADMIN, tutorId,
                        EntityType.TUTOR, collaborationId, EntityType.COLLABORATION);
                notificationService.sendNotification(authenticatedUser.getAdministratorId(), EntityType.ADMIN, tuteeId,
                        EntityType.TUTEE, collaborationId, EntityType.COLLABORATION);
            }
            default -> throw new IllegalArgumentException("Invalid role specified.");
        }
    }
/* 
    // request specififc tutor or tutor request tutee through a post
    public void requestCollaboration(Long tuteeId, Long tutorId, RoleEnum collabRequester, SubjectEnum subject) {

        Collaboration collaboration = new Collaboration();
        collaboration.setSubject(subject);
        collaboration.setState(CollaborationState.WAITING_FOR_BOTH);
        Long collaborationId = collaboration.getId();

        switch (collabRequester) {
            case Tutee -> {
                Tutee tutee = roleService.getTuteeById(tuteeId);
                collaboration.setTuteeState(CollaborationState.ESTABLISHED);
                collaboration.setTutee(tutee);
                collaboration.setTutorState(CollaborationState.WAITING_FOR_TUTOR);

                notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR,
                        collaborationId, EntityType.COLLABORATION);

            }
            case Tutor -> {
                Tutor tutor = roleService.getTutorById(tutorId);
                collaboration.setTuteeState(CollaborationState.ESTABLISHED);
                collaboration.setTutor(tutor);
                collaboration.setTuteeState(CollaborationState.WAITING_FOR_TUTEE);

                notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE,
                        collaborationId, EntityType.COLLABORATION);
            }
            case Administrator -> throw new UnsupportedOperationException("Unimplemented case: " + collabRequester);
            default -> throw new IllegalArgumentException("Unexpected value: " + collabRequester);
        }
    } */

    public void requestCollaborationByPost(RequestCollaborationByPostBody postBody) {

        Post post = postService.getPostById(postBody.getPost_id())
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        Tutee tutee = post.getTutee();
        Tutor tutor = roleService.getTutorByUserId(postBody.getTutor_id());
        ArrayList<Collaboration> existingCollaboration = collaborationRepository
                .findByTuteeTutorAndSubject(tutee.getId(), tutor.getId(), post.getSubject());
        if (existingCollaboration.size() > 0 || existingCollaboration == null) {
            throw new IllegalArgumentException("Collaboration already exists or request is pending");
        }
        Collaboration collaboration = new Collaboration();

        collaboration.setTutee(post.getTutee());
        collaboration.setTutor(tutor);
        collaboration.setSubject(post.getSubject());
        collaboration.setAdminAccepted(false);        
        collaboration.setState(CollaborationState.WAITING_FOR_TUTEE);
        collaboration.setStartTimestamp(new Timestamp(System.currentTimeMillis()));
        collaborationRepository.save(collaboration);
    }

    public void requestCollaborationByTutor(RequestCollaborationByTutorBody body, Long tuteeId, Post newPost) {

        ArrayList<Collaboration> existingCollaboration = collaborationRepository.findByTuteeTutorAndSubject(tuteeId,
                body.tutorId, body.subject);
        System.out.println("existingCollaboration" + existingCollaboration);
        if (existingCollaboration.size() > 0 || existingCollaboration == null) {
            throw new IllegalArgumentException("Collaboration already exists or request is pending");
        }
        System.out.println("tuteeIdssssss" + tuteeId);
        Collaboration collaboration = new Collaboration();
        Tutor tutor = roleService.getTutorById(body.tutorId);
        Tutee tutee = roleService.getTuteeById(tuteeId);

        collaboration.setTutee(tutee);
        collaboration.setTutor(tutor);
        collaboration.setAdminAccepted(false);
        collaboration.setSubject(newPost.getSubject());

        collaboration.setState(CollaborationState.WAITING_FOR_TUTOR);
        collaboration.setStartTimestamp(new Timestamp(System.currentTimeMillis()));
        Collaboration createdCollab = collaborationRepository.save(collaboration);
        notificationService.sendNotification(tutee.getId(), EntityType.TUTEE, tutor.getId(), EntityType.TUTOR,
                createdCollab.getId(), EntityType.COLLABORATION);
    }

    public void terminateCollaboration(Long collaborationId, String terminationReason) {
        Collaboration collaboration = getCollaborationById(collaborationId);

        // Remove the collaboration for tutee and tutor
        Tutee tutee = collaboration.getTutee();
        tutee.getCollaborations().remove(collaboration);

        Tutor tutor = collaboration.getTutor();
        tutor.getCollaborations().remove(collaboration);

        collaboration.setState(CollaborationState.TERMINATED);
        collaboration.setEndTimestamp(new Timestamp(System.currentTimeMillis()));
        collaboration.setTerminationReason(terminationReason);

        collaborationRepository.save(collaboration);
    }

    public void submitFeedback(Long collaborationId, Long tuteeId, Feedback feedback) {
        Collaboration collaboration = getCollaborationById(collaborationId);

        Tutor tutor = collaboration.getTutor();

        tutor.getFeedbacks().add(feedback);

        Administrator admin = administratorRepository.findFirstBy()
                .orElseThrow(() -> new IllegalStateException("Administrator not found"));

        notificationService.sendNotification(tuteeId, EntityType.TUTEE, admin.getId(), EntityType.ADMIN,
                feedback.getId(), EntityType.FEEDBACK);
    }

}
