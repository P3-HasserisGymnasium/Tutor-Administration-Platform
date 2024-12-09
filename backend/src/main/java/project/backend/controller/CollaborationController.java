package project.backend.controller;

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
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.model.Collaboration;
import project.backend.model.Feedback;
import project.backend.model.RoleEnum;
import project.backend.service.CollaborationService;
import project.backend.utilities.HelperFunctions;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/collaboration")
public class CollaborationController {

    private final CollaborationService collaborationService;
    private final HelperFunctions helperFunctions;

    public CollaborationController(CollaborationService collaborationService, HelperFunctions helperFunctions) {
        this.collaborationService = collaborationService;
        this.helperFunctions = helperFunctions;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCollaboration(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Collaboration collaboration = collaborationService.getCollaborationById(id);

        if (collaboration == null) {
            return null;
        }

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaboration.getId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this collaboration");
        }

        return ResponseEntity.status(HttpStatus.OK).body(collaboration);
    }

    @GetMapping("/with_tutor/{id}")
    public ResponseEntity<?> getCollaborationWithTutor(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, id)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this collaboration");
        }

        List<Collaboration> collaborations = collaborationService.getCollaborationsWithTutor(id);
        return ResponseEntity.status(HttpStatus.OK).body(collaborations);
    }

    @GetMapping("/with_tutee/{id}")
    public ResponseEntity<?> getCollaborationWithTutee(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, id)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this collaboration");
        }

        List<Collaboration> collaborations = collaborationService.getCollaborationsWithTutee(id);
        return ResponseEntity.status(HttpStatus.OK).body(collaborations);
        
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCollaborations(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, null)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this collaboration");
        }

        List<Collaboration> collaborations = collaborationService.getAllCollaborations();

        return ResponseEntity.status(HttpStatus.OK).body(collaborations);
    }

    @PostMapping("/")
    public ResponseEntity<?> createCollaboration(@RequestBody CollaborationCreateBody body, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, null)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to create this collaboration");
        }

        collaborationService.createCollaboration(body);

        return ResponseEntity.status(HttpStatus.OK).body("Collaboration created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollaboration(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, id)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to delete this collaboration");
        }

        collaborationService.deleteCollaborationById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration deleted");
    }

    @PostMapping("/request-suggestion/{id}")
    public ResponseEntity<?> requestCollaborationSuggestion(@PathVariable Long tuteeId, @RequestBody PostBody requestBody, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, tuteeId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to request this collaboration suggestion");
        }

        collaborationService.requestCollaborationSuggestion(tuteeId, requestBody);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration suggestion requested");
    }

    @PostMapping("/submit-suggestion/{collaborationId}/{tutorId}")
    public ResponseEntity<?> submitCollaborationSuggestion(@PathVariable Long collaborationId, @PathVariable Long tutorId, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaborationId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to submit this collaboration suggestion");
        }
        collaborationService.submitCollaborationSuggestion(collaborationId, tutorId);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration suggestion submitted");
        }

    @PostMapping("/accept/{collaborationId}")
    public ResponseEntity<?> acceptCollaboration(@PathVariable Long collaborationId, @RequestBody RoleEnum role, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaborationId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to accept this collaboration");
        }

        collaborationService.acceptCollaboration(collaborationId, role);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration accepted");
    }

    @PostMapping("reject/{collaborationId}")
    public ResponseEntity<?> rejectCollaboration(@PathVariable Long collaborationId, @RequestBody RoleEnum role, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaborationId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to reject this collaboration");
        }

        collaborationService.rejectCollaboration(collaborationId, role);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration rejected");
    }

    @PostMapping("/terminate/{collaborationId}")
    public ResponseEntity<?> terminateCollaboration(@PathVariable Long collaborationId, @RequestBody String terminationReason, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaborationId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to terminate this collaboration");
        }

        collaborationService.terminateCollaboration(collaborationId, terminationReason);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration terminated");
    }

    @PostMapping("/feedback/{collaborationId}/{tuteeId}")
    public ResponseEntity<?> submitFeedback(@PathVariable Long collaborationId, @PathVariable Long tuteeId, @RequestBody Feedback feedback, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaborationId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to submit feedback for this collaboration");
        }

        collaborationService.submitFeedback(collaborationId, tuteeId, feedback);
        return ResponseEntity.status(HttpStatus.OK).body("Feedback submitted");
    }
}
