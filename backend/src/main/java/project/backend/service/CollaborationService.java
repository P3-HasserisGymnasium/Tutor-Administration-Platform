package project.backend.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByPostBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByTutorBody;
import project.backend.controller_bodies.post_controller.PostBody;
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



    public CollaborationService(CollaborationRepository collaborationRepository, RoleService roleService, NotificationService notificationService, AdministratorRepository administratorRepository, PostService postService) {
        this.collaborationRepository = collaborationRepository;
        this.roleService = roleService;
        this.notificationService = notificationService;
        this.administratorRepository = administratorRepository;
        this.postService = postService;
    }

    public Collaboration getCollaborationById(Long id){
        Optional<Collaboration> collaboratOpt = collaborationRepository.findById(id);

        return collaboratOpt.orElse(null);
    }

    public ArrayList<Collaboration> getCollaborationsWithTutor(Long tutorId){
        return collaborationRepository.findCollaborationsWithTutorId(tutorId);
    }

    public ArrayList<Collaboration> getCollaborationsWithTutee(Long tuteeId){
        return collaborationRepository.findCollaborationsWithTuteeId(tuteeId);
    }

    public List<Collaboration> getAllCollaborations(){
        return collaborationRepository.findAll();
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

    // this is very weird implemented, should receive a post body, and correctly fill out all the options.
     public void requestCollaborationSuggestion(Long studentId, PostBody requestBody){
        Collaboration collaboration = new Collaboration();
        collaboration.setSubject(requestBody.subject);
        collaboration.setState(CollaborationState.PENDING);
        collaboration.setTutee(roleService.getTuteeById(studentId));
        collaborationRepository.save(collaboration);
    } 


    // admin provides collaboration suggestion
    public void submitCollaborationSuggestion(Long collaborationId, Long tutorId){
        Tutor tutor = roleService.getStudentById(tutorId).getTutor();

        Collaboration collaboration = getCollaborationById(collaborationId);
        
        collaboration.setTutor(tutor);
        collaboration.setAdminState(CollaborationState.ACCEPTED);
        collaboration.setTutorState(CollaborationState.PENDING);
        collaboration.setTuteeState(CollaborationState.PENDING);

        Long tuteeId = collaboration.getTutee().getId();

        // notify tutor and tutee of the collaboration suggestion
        notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR, collaborationId, EntityType.COLLABORATION);
        notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, collaborationId, EntityType.COLLABORATION);

        collaborationRepository.save(collaboration);  
    }

   
    public void acceptCollaboration(Long collaborationId, RoleEnum role){

        Collaboration collaboration = getCollaborationById(collaborationId);

        switch(role){
            case Tutee:
                collaboration.setTuteeState(CollaborationState.ACCEPTED);
                break;
            case Tutor:
                collaboration.setTutorState(CollaborationState.ACCEPTED);
                break;
            default:
                throw new IllegalArgumentException("Invalid role specified.");
        }

    
        if(collaboration.getTutorState() == CollaborationState.ACCEPTED && 
            collaboration.getTuteeState() == CollaborationState.ACCEPTED){
            

            collaboration.setState(CollaborationState.WAITING_FOR_ADMIN);

             // Dynamically determine the sender based on the role
            Long senderId = (role == RoleEnum.Tutee) ? collaboration.getTutee().getId() : collaboration.getTutor().getId();
            EntityType senderType = (role == RoleEnum.Tutee) ? EntityType.TUTEE : EntityType.TUTOR;

            Administrator admin = administratorRepository.findFirstBy().orElseThrow(() -> new IllegalStateException("Administrator not found"));

            notificationService.sendNotification(senderId, senderType, admin.getId(), EntityType.ADMIN,collaborationId, EntityType.COLLABORATION);
        }

        collaborationRepository.save(collaboration);
    }

    public void rejectCollaboration(Long collaborationId, RoleEnum role){
        Collaboration collaboration = getCollaborationById(collaborationId);

        Long tuteeId =  collaboration.getTutee().getId();
        Long tutorId = collaboration.getTutor().getId();


        if(collaboration.getAdminState() == CollaborationState.REJECTED){
            collaboration.setState(CollaborationState.REJECTED);

            notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR, collaborationId, EntityType.COLLABORATION);
            notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, collaborationId, EntityType.COLLABORATION);

        } else if (role == RoleEnum.Tutee){
            collaboration.setTuteeState(CollaborationState.REJECTED);
            collaboration.setState(CollaborationState.REJECTED);

            notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR, collaborationId, EntityType.COLLABORATION);

        } else if (role == RoleEnum.Tutor){
            collaboration.setTutorState(CollaborationState.REJECTED);
            collaboration.setState(CollaborationState.REJECTED);

            notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, collaborationId, EntityType.COLLABORATION);
        }else{
            throw new IllegalArgumentException("Invalid role specified.");
        } 

        deleteCollaborationById(collaborationId);
    }


    public void requestCollaborationByPost(RequestCollaborationByPostBody postBody) {
        Collaboration collaboration = new Collaboration();
        Tutor tutor = roleService.getTutorById(postBody.getTutor_id());
        Post post = postService.getPostById(postBody.getPost_id()).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        collaboration.setTutee(post.getTutee());
        collaboration.setTutor(tutor);
        collaboration.setSubject(post.getSubject());
        collaboration.setState(CollaborationState.WAITING_FOR_TUTEE);
        collaboration.setStartTimestamp(new Timestamp(System.currentTimeMillis()));
        collaborationRepository.save(collaboration);
        notificationService.sendNotification(post.getTutee().getId(), EntityType.TUTEE, tutor.getId(), EntityType.TUTOR, collaboration.getId(), EntityType.COLLABORATION);
    }

    public void requestCollaborationByTutor(RequestCollaborationByTutorBody postBody) {
        Collaboration collaboration = new Collaboration();
        Tutor tutor = roleService.getTutorById(postBody.getTutor_id());
        Tutee tutee = roleService.getTuteeById(postBody.getTutee_id());

        collaboration.setTutee(tutee);
        collaboration.setTutor(tutor);
        collaboration.setSubject(postBody.getPost().getSubject());
        collaboration.setState(CollaborationState.WAITING_FOR_TUTOR);
        collaboration.setStartTimestamp(new Timestamp(System.currentTimeMillis()));
        collaborationRepository.save(collaboration);
        notificationService.sendNotification(tutee.getId(), EntityType.TUTEE, tutor.getId(), EntityType.TUTOR, collaboration.getId(), EntityType.COLLABORATION);
    }


    // request specififc tutor or tutor request tutee through a post
    public void requestCollaboration(Long tuteeId, Long tutorId, RoleEnum collabRequester, SubjectEnum subject){

        Collaboration collaboration = new Collaboration();
        collaboration.setSubject(subject);
        collaboration.setState(CollaborationState.PENDING);
        Long collaborationId = collaboration.getId();

        switch(collabRequester){
            case Tutee -> {
                Tutee tutee = roleService.getTuteeById(tuteeId);
                collaboration.setTuteeState(CollaborationState.ACCEPTED);
                collaboration.setTutee(tutee);
                collaboration.setTutorState(CollaborationState.WAITING_FOR_TUTOR);

                notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR, collaborationId, EntityType.COLLABORATION);

            }
            case Tutor -> {
                Tutor tutor = roleService.getTutorById(tutorId);
                collaboration.setTuteeState(CollaborationState.ACCEPTED);
                collaboration.setTutor(tutor);
                collaboration.setTuteeState(CollaborationState.WAITING_FOR_TUTEE);

                notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, collaborationId, EntityType.COLLABORATION);
            }
            default -> throw new IllegalArgumentException("Invalid role specified.");
        }

        collaborationRepository.save(collaboration);
    }

    public void terminateCollaboration(Long collaborationId, String terminationReason){
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

    public void submitFeedback(Long collaborationId, Long tuteeId, Feedback feedback){
        Collaboration collaboration = getCollaborationById(collaborationId);

        Tutor tutor = collaboration.getTutor();

        tutor.getFeedbacks().add(feedback); 

        Administrator admin = administratorRepository.findFirstBy().orElseThrow(() -> new IllegalStateException("Administrator not found"));
    
        notificationService.sendNotification(tuteeId, EntityType.TUTEE, admin.getId(), EntityType.ADMIN, feedback.getId(), EntityType.FEEDBACK);
    }


}
