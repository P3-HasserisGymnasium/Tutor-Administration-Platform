package project.backend.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.model.Collaboration;
import project.backend.model.CollaborationState;
import project.backend.model.Feedback;
import project.backend.model.RoleEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.repository.CollaborationRepository;


@Service
public class CollaborationService {
    
    @Autowired
    final CollaborationRepository collaborationRepository;

    @Autowired
    final NotificationService notificationService;

    @Autowired
    final RoleService roleService;



    public CollaborationService(CollaborationRepository collaborationRepository, RoleService roleService, NotificationService notificationService) {
        this.collaborationRepository = collaborationRepository;
        this.roleService = roleService;
        this.notificationService = notificationService;
    }

    public Collaboration getCollaborationById(Long id){
        Optional<Collaboration> collaboratOpt = collaborationRepository.findById(id);
        return collaboratOpt.orElseThrow(() -> new IllegalArgumentException("Collaboratio with id" + id + "not found"));
    }

    public List<Collaboration> getCollaborationsWithTutor(Long tutorId){
        return collaborationRepository.findCollaborationsWithTutorId(tutorId);
    }

    public List<Collaboration> getCollaborationsWithTutee(Long tuteeId){
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

    // request admin for help
    public void requestCollaborationSuggestion(Long tuteeId, SubjectEnum subject){
        Tutee tutee = roleService.getStudentById(tuteeId).getTutee();

        CollaborationCreateBody createBody = new CollaborationCreateBody();
        createBody.tutee_id = tuteeId;
        createBody.state = CollaborationState.PENDING;
        createBody.subject = subject;

        createCollaboration(createBody);
    }


    // admin provides collaboration suggestion
    public void submitCollaborationSuggestion(Long collaborationId, Long tutorId){
        Tutor tutor = roleService.getStudentById(tutorId).getTutor();

        Collaboration collaboration = getCollaborationById(collaborationId);
        
        collaboration.setTutor(tutor);
        collaboration.setAdminState(CollaborationState.ACCEPTED);
        collaboration.setTutorState(CollaborationState.PENDING);
        collaboration.setTuteeState(CollaborationState.PENDING);

        // notify tutee
        // notify tutor
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
            // notify admin
        }

        collaborationRepository.save(collaboration);
    }

    public void rejectCollaboration(Long collaborationId, RoleEnum role){
        Collaboration collaboration = getCollaborationById(collaborationId);


        if(collaboration.getAdminState() == CollaborationState.REJECTED){
            // notify tutor 
            // notify tutee
            collaboration.setState(CollaborationState.REJECTED);
        } else if (role == RoleEnum.Tutee){
            collaboration.setTuteeState(CollaborationState.REJECTED);
            collaboration.setState(CollaborationState.REJECTED);
            // notify tutor
        } else if (role == RoleEnum.Tutor){
            collaboration.setTutorState(CollaborationState.REJECTED);
            collaboration.setState(CollaborationState.REJECTED);
            // notify tutee
        }else{
            throw new IllegalArgumentException("Invalid role specified.");
        } 

        deleteCollaborationById(collaborationId);
    }

    
    // request specififc tutor or tutor request tutee through a post
    public void requestCollaboration(Long tuteeId, Long tutorId, RoleEnum collabRequester, SubjectEnum subject){

        CollaborationCreateBody createBody = new CollaborationCreateBody();
        createBody.state = CollaborationState.PENDING;
        createBody.subject = subject;

        switch(collabRequester){
            case Tutee -> {
                Tutee tutee = roleService.getTuteeById(tuteeId);
                createBody.state = CollaborationState.ACCEPTED;
                createBody.tutee_id = tutee.getId();
                createBody.tutorState = CollaborationState.WAITING_FOR_TUTOR;
                //TODO: notify tutor
            }
            case Tutor -> {
                Tutor tutor = roleService.getTutorByUserId(tutorId);
                createBody.state = CollaborationState.ACCEPTED;
                createBody.tutor_id = tutor.getId();
                createBody.tutorState = CollaborationState.WAITING_FOR_TUTEE;
                //TODO: notify tutor
            }
            default -> throw new IllegalArgumentException("Invalid role specified.");
        }

        createCollaboration(createBody);
        // notify admin 
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

    public void establishCollaboration(Long collaborationId){
        Collaboration collaboration = getCollaborationById(collaborationId);
        
        // Add the collaboration for tutee and tutor
        Tutee tutee = collaboration.getTutee();
        tutee.getCollaborations().add(collaboration);
        
        Tutor tutor = collaboration.getTutor();
        tutor.getCollaborations().add(collaboration);
        
        collaboration.setState(CollaborationState.ESTABLISHED);
        collaboration.setStartTimestamp(new Timestamp(System.currentTimeMillis()));
        collaborationRepository.save(collaboration);
    }

    public void submitFeedback(Long collaborationId, Long tuteeId, Feedback feedback){
        Collaboration collaboration = getCollaborationById(collaborationId);

        Tutor tutor = collaboration.getTutor();

        tutor.getFeedbacks().add(feedback); 
        // notify admin
    }

}
