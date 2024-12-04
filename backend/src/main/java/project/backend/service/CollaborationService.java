package project.backend.service;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.CollaborationState;
import project.backend.model.SubjectEnum;
import project.backend.model.RoleEnum;

import project.backend.model.Collaboration;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.Feedback;

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

    public Collaboration saveCollaboration(Collaboration collaboration) {
        return collaborationRepository.save(collaboration);
    }

    public void deleteCollaborationById(Long id) {
        collaborationRepository.deleteById(id);
    }

    // request admin for help
    public void requestCollaborationSuggestion(Long tutteeId, SubjectEnum subject){
        Tutee tutee = roleService.getStudentById(tutteeId).getTutee();
        Collaboration collaboration = new Collaboration();
        collaboration.setTutee(tutee);
        collaboration.setState(CollaborationState.PENDING);

        saveCollaboration(collaboration);
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
        saveCollaboration(collaboration);
        
    }


    public void acceptCollaboration(Long collaborationId, RoleEnum role){

        Collaboration collaboration = getCollaborationById(collaborationId);

        switch(role){
            case TUTEE:
                collaboration.setTuteeState(CollaborationState.ACCEPTED);
                break;
            case TUTOR:
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

        saveCollaboration(collaboration);
    }

    public void rejectCollaboration(Long collaborationId, RoleEnum role){
        Collaboration collaboration = getCollaborationById(collaborationId);


        if(collaboration.getAdminState() == CollaborationState.REJECTED){
            // notify tutor 
            // notify tutee
            collaboration.setState(CollaborationState.REJECTED);
        } else if (role == RoleEnum.TUTEE){
            collaboration.setTuteeState(CollaborationState.REJECTED);
            collaboration.setState(CollaborationState.REJECTED);
            // notify tutor
        } else if (role == RoleEnum.TUTOR){
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

        Collaboration collaboration = new Collaboration();
        collaboration.setSubject(subject);
        collaboration.setState(CollaborationState.PENDING);

        switch(collabRequester){
            case TUTEE:
                Tutee tutee = roleService.getTuteeById(tuteeId);
                collaboration.setTuteeState(CollaborationState.ACCEPTED);
                collaboration.setTutee(tutee);

                collaboration.setTutorState(CollaborationState.WAITING_FOR_TUTOR);
                // notify tutor
                break;
            case TUTOR:
                Tutor tutor = roleService.getTutorById(tutorId);
                collaboration.setTuteeState(CollaborationState.ACCEPTED);
                collaboration.setTutor(tutor);

                collaboration.setTuteeState(CollaborationState.WAITING_FOR_TUTEE);
                // notify tutor
                break;
            default:
                throw new IllegalArgumentException("Invalid role specified.");
        }

        saveCollaboration(collaboration);
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

        saveCollaboration(collaboration);
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
        saveCollaboration(collaboration);
    }

    public void submitFeedback(Long collaborationId, Long tuteeId, Feedback feedback){
        Collaboration collaboration = getCollaborationById(collaborationId);

        Tutor tutor = collaboration.getTutor();

        tutor.getFeedbacks().add(feedback); 
        // notify admin
    }

}
