package project.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByPostBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByTutorBody;
import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.model.Collaboration;
import project.backend.model.Feedback;
import project.backend.model.RoleEnum;
import project.backend.service.CollaborationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/collaboration")
public class CollaborationController {

    private final CollaborationService collaborationService;

    public CollaborationController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCollaboration(@PathVariable Long id, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Collaboration collaboration = collaborationService.getCollaborationById(id);

        if (collaboration == null) {
            return null;
        }

        return ResponseEntity.status(HttpStatus.OK).body(collaboration);
    }

    @GetMapping("/as_tutor")
    public ResponseEntity<?> getCollaborationWithTutor(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        ArrayList<Collaboration> collaborations = collaborationService.getCollaborationsWithTutor(authenticatedUser.getTutorId());
        return ResponseEntity.status(HttpStatus.OK).body(collaborations);
    }

    @GetMapping("/as_tutee")
    public ResponseEntity<?> getCollaborationWithTutee(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        ArrayList<Collaboration> collaborations = collaborationService.getCollaborationsWithTutee(authenticatedUser.getTuteeId());
        return ResponseEntity.status(HttpStatus.OK).body(collaborations);        
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCollaborations(HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        List<Collaboration> collaborations = collaborationService.getAllCollaborations();

        return ResponseEntity.status(HttpStatus.OK).body(collaborations);
    }

    @PostMapping("/")
    public ResponseEntity<?> createCollaboration(@RequestBody CollaborationCreateBody body, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        collaborationService.createCollaboration(body);

        return ResponseEntity.status(HttpStatus.OK).body("Collaboration created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollaboration(@PathVariable Long id, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        collaborationService.deleteCollaborationById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration deleted");
    }

    @PostMapping("/request/by-post")
    public ResponseEntity<?> requestCollaborationByPost(@RequestBody RequestCollaborationByPostBody postBody, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (authenticatedUser.getTutorId() != postBody.getTutor_id() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in as a tutee to request a collaboration");
        }

        try {
            collaborationService.requestCollaborationByPost(postBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }


        return ResponseEntity.status(HttpStatus.OK).body("Collaboration requested");
    }

    @PostMapping("/request/by-tutor")
    public ResponseEntity<?> requestCollaboration(@RequestBody RequestCollaborationByTutorBody postBody, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);


        if (authenticatedUser.getTuteeId() != postBody.getTutee_id() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in as a tutor to request a collaboration");
        }
        
        try {
            collaborationService.requestCollaborationByTutor(postBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body("Collaboration requested");
    }


    @PostMapping("/request-suggestion/{id}")
    public ResponseEntity<?> requestCollaborationSuggestion(@PathVariable Long tuteeId, @RequestBody PostBody requestBody, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        collaborationService.requestCollaborationSuggestion(tuteeId, requestBody);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration suggestion requested");
    }

    @PostMapping("/submit-suggestion/{collaborationId}/{tutorId}")
    public ResponseEntity<?> submitCollaborationSuggestion(@PathVariable Long collaborationId, @PathVariable Long tutorId, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        collaborationService.submitCollaborationSuggestion(collaborationId, tutorId);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration suggestion submitted");
        }

    @PostMapping("/accept/{collaborationId}/{role}")
    public ResponseEntity<?> acceptCollaboration(@PathVariable Long collaborationId, @PathVariable RoleEnum role, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (collaborationService.getCollaborationById(collaborationId) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Collaboration does not exist");
        }

        try {
            collaborationService.acceptCollaboration(collaborationId, role);
            return ResponseEntity.status(HttpStatus.OK).body("Collaboration accepted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("reject/{collaborationId}/{role}")
    public ResponseEntity<?> rejectCollaboration(@PathVariable Long collaborationId, @PathVariable RoleEnum role, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (collaborationService.getCollaborationById(collaborationId) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Collaboration does not exist");
        }

        try {
            collaborationService.rejectCollaboration(collaborationId, role);
            return ResponseEntity.status(HttpStatus.OK).body("Collaboration rejected");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @PostMapping("/terminate/{collaborationId}")
    public ResponseEntity<?> terminateCollaboration(@PathVariable Long collaborationId, @RequestBody String terminationReason, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        collaborationService.terminateCollaboration(collaborationId, terminationReason);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration terminated");
    }

    @PostMapping("/feedback/{collaborationId}/{tuteeId}")
    public ResponseEntity<?> submitFeedback(@PathVariable Long collaborationId, @PathVariable Long tuteeId, @RequestBody Feedback feedback, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        collaborationService.submitFeedback(collaborationId, tuteeId, feedback);
        return ResponseEntity.status(HttpStatus.OK).body("Feedback submitted");
    }
}
