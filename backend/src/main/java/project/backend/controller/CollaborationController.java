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
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.controller_bodies.collaboration_bodies.CollaborationResponseBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByPostBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByTutorBody;
import project.backend.controller_bodies.collaboration_bodies.SubmitBody;
import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.controller_bodies.role_controller.TuteeProfileResponse;
import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.Collaboration;
import project.backend.model.EntityType;
import project.backend.model.Feedback;
import project.backend.model.Post;
import project.backend.model.PostState;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.SubjectEnum;
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
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Collaboration collaboration = collaborationService.getCollaborationById(id);

        if (collaboration == null) return null;

        if (collaboration.isPartOfCollaboration(authenticatedUser) == false && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authortized to view this collaboration");
        }


        CollaborationResponseBody collaborationResponseBody = new CollaborationResponseBody();
        collaborationResponseBody.setId(collaboration.getId());
        collaborationResponseBody.setTuteeId(collaboration.getTutee().getId());
        collaborationResponseBody.setTutorId(collaboration.getTutor().getId());
        collaborationResponseBody.setTuteeName(collaboration.getTutee().getStudent().getFullName());
        collaborationResponseBody.setTutorName(collaboration.getTutor().getStudent().getFullName());
        collaborationResponseBody.setState(collaboration.getState());
        collaborationResponseBody.setSubject(collaboration.getSubject());
        collaborationResponseBody.setStartDate(collaboration.getStartTimestamp());

        return ResponseEntity.status(HttpStatus.OK).body(collaborationResponseBody);
    }

    @GetMapping("/as_tutor")
    public ResponseEntity<?> getCollaborationWithTutor(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        ArrayList<Collaboration> collaborations = collaborationService
                .getCollaborationsWithTutor(authenticatedUser.getTutorId());

        ArrayList<CollaborationResponseBody> collaborationResponseBodies = new ArrayList<>();

        for (Collaboration collaboration : collaborations) {
            CollaborationResponseBody collaborationResponseBody = new CollaborationResponseBody();
            collaborationResponseBody.setId(collaboration.getId());
            collaborationResponseBody.setTuteeId(collaboration.getTutee().getId());
            collaborationResponseBody.setTutorId(collaboration.getTutor().getId());
            collaborationResponseBody.setTuteeName(collaboration.getTutee().getStudent().getFullName());
            collaborationResponseBody.setTutorName(collaboration.getTutor().getStudent().getFullName());
            collaborationResponseBody.setState(collaboration.getState());
            collaborationResponseBody.setSubject(collaboration.getSubject());
            collaborationResponseBody.setStartDate(collaboration.getStartTimestamp());
            collaborationResponseBodies.add(collaborationResponseBody);
        }

        return ResponseEntity.status(HttpStatus.OK).body(collaborationResponseBodies);
    }

    @GetMapping("/as_tutee")
    public ResponseEntity<?> getCollaborationWithTutee(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        ArrayList<Collaboration> collaborations = collaborationService
                .getCollaborationsWithTutee(authenticatedUser.getTuteeId());

        ArrayList<CollaborationResponseBody> collaborationResponseBodies = new ArrayList<>();

        for (Collaboration collaboration : collaborations) {
            CollaborationResponseBody collaborationResponseBody = new CollaborationResponseBody();
            collaborationResponseBody.setId(collaboration.getId());
            collaborationResponseBody.setTuteeId(collaboration.getTutee().getId());
            collaborationResponseBody.setTutorId(collaboration.getTutor().getId());
            collaborationResponseBody.setTuteeName(collaboration.getTutee().getStudent().getFullName());
            collaborationResponseBody.setTutorName(collaboration.getTutor().getStudent().getFullName());
            collaborationResponseBody.setState(collaboration.getState());
            collaborationResponseBody.setSubject(collaboration.getSubject());
            collaborationResponseBody.setStartDate(collaboration.getStartTimestamp());
            collaborationResponseBodies.add(collaborationResponseBody);

        }

        return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>(collaborationResponseBodies));

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCollaborations(HttpServletRequest request) {
        // AuthenticatedUserBody authenticatedUser =
        // AuthUser.getAuthenticatedUser(request);

        List<Collaboration> collaborations = collaborationService.getAllCollaborations();

        ArrayList<CollaborationResponseBody> collaborationResponseBodies = new ArrayList<>();

        for (Collaboration collaboration : collaborations) {
            CollaborationResponseBody collaborationResponseBody = new CollaborationResponseBody();
            collaborationResponseBody.setId(collaboration.getId());
            collaborationResponseBody.setTuteeId(collaboration.getTutee().getId());
            collaborationResponseBody.setTutorId(collaboration.getTutor().getId());
            collaborationResponseBody.setTuteeName(collaboration.getTutee().getStudent().getFullName());
            collaborationResponseBody.setTutorName(collaboration.getTutor().getStudent().getFullName());
            collaborationResponseBody.setState(collaboration.getState());
            collaborationResponseBody.setSubject(collaboration.getSubject());
            collaborationResponseBody.setStartDate(collaboration.getStartTimestamp());

            collaborationResponseBodies.add(collaborationResponseBody);
        }

        return ResponseEntity.status(HttpStatus.OK).body(collaborationResponseBodies);
    }

    @GetMapping("/awaiting_acceptance")
    public ResponseEntity<?> getCollaborationsAwaitingAcceptance(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: You must be logged in as an administrator to view collaborations awaiting acceptance");
        }

        List<Collaboration> collaborations = collaborationService.getCollaborationsAwaitingAcceptance();

        return ResponseEntity.status(HttpStatus.OK).body(collaborations);
    }

    @PostMapping("/")
    public ResponseEntity<?> createCollaboration(@RequestBody CollaborationCreateBody body,
            HttpServletRequest request) {
        // AuthenticatedUserBody authenticatedUser =
        // AuthUser.getAuthenticatedUser(request);

        collaborationService.createCollaboration(body);

        return ResponseEntity.status(HttpStatus.OK).body("Collaboration created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollaboration(@PathVariable Long id, HttpServletRequest request) {
        // AuthenticatedUserBody authenticatedUser =
        // AuthUser.getAuthenticatedUser(request);

        collaborationService.deleteCollaborationById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration deleted");
    }

    @GetMapping("/partner/{collaborationId}")
    public ResponseEntity<?> getPartner(@PathVariable Long collaborationId, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        try {
            Collaboration collaboration = collaborationService.getCollaborationById(collaborationId);
            boolean isTutor = collaboration.getTutor().getId().equals(authenticatedUser.getTutorId());
            if (isTutor) {

                Student student = collaborationService.getStudentByTuteeId(collaboration.getTutee().getId());
                TuteeProfileResponse response = collaborationService.getTuteeProfile(student.getId());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Student student = collaborationService.getStudentByTutorId(collaboration.getTutor().getId());
                TutorProfileResponse response = collaborationService.getTutorProfile(student.getId());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @PostMapping("/request/by-post")
    public ResponseEntity<?> requestCollaborationByPost(@RequestBody RequestCollaborationByPostBody postBody,
            HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: You must be logged in as a tutee to request a collaboration");
        }

        try {
            collaborationService.requestCollaborationByPost(postBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        Post post = collaborationService.getPostById(postBody.getPost_id()).orElse(null);

        collaborationService.sendNotification(authenticatedUser.getTutorId(), EntityType.TUTOR, post.getTutee().getId(), EntityType.TUTEE, post.getId(), EntityType.POST);
        
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration requested");
    }

    @PostMapping("/request/by-tutor")
    public ResponseEntity<?> requestCollaboration(@RequestBody RequestCollaborationByTutorBody body,
            HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutee() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: You must be logged in as a tutor to request a collaboration");
        }
        
        try { 
            PostBody postBody = new PostBody(authenticatedUser.userId, body.title, body.description, body.subject, body.duration, PostState.INVISIBLE);
            postBody.setPairingRequest(body.pairing_request);
            Post post = collaborationService.createPost(postBody, authenticatedUser.getTuteeId());
            collaborationService.requestCollaborationByTutor(body, authenticatedUser.getTuteeId(), post);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration requested");
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitCollaborationSuggestion(@RequestBody SubmitBody body, HttpServletRequest request) {
         AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

         if (!authenticatedUser.isAdministrator()) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                     .body("Unauthorized: You must be logged in as an administrator to submit a collaboration suggestion");
         }

         try {
             collaborationService.submitCollaborationSuggestion(body);
             return ResponseEntity.status(HttpStatus.OK).body("Collaboration suggestion submitted");
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error" + e.getMessage());
         }
    }

    @PostMapping("/accept/{collaborationId}/{role}")
    public ResponseEntity<?> acceptCollaboration(@PathVariable Long collaborationId, @PathVariable RoleEnum role,
            HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (collaborationService.getCollaborationById(collaborationId) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Collaboration does not exist");
        }

        try {
            collaborationService.acceptCollaboration(collaborationId, role, authenticatedUser);
            return ResponseEntity.status(HttpStatus.OK).body("Collaboration accepted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/acceptByPost/{postId}/{tutorId}")
    public ResponseEntity<?> acceptCollaborationByPost(@PathVariable Long postId, @PathVariable Long tutorId, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        SubjectEnum post_subject = collaborationService.getPostById(postId).get().getSubject();

        if (post_subject == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post does not exist");
        }

        try {
            collaborationService.acceptCollaborationByPost(post_subject, tutorId, authenticatedUser);
            return ResponseEntity.status(HttpStatus.OK).body("Collaboration accepted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("reject/{collaborationId}/{role}")
    public ResponseEntity<?> rejectCollaboration(@PathVariable Long collaborationId, @PathVariable RoleEnum role,
            HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (collaborationService.getCollaborationById(collaborationId) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Collaboration does not exist");
        }

        try {
            collaborationService.rejectCollaboration(collaborationId, role, authenticatedUser);
            return ResponseEntity.status(HttpStatus.OK).body("Collaboration rejected");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @PostMapping("/terminate/{collaborationId}")
    public ResponseEntity<?> terminateCollaboration(@PathVariable Long collaborationId,
            @RequestBody String terminationReason, HttpServletRequest request) {
        // AuthenticatedUserBody authenticatedUser =
        // AuthUser.getAuthenticatedUser(request);

        collaborationService.terminateCollaboration(collaborationId, terminationReason);
        return ResponseEntity.status(HttpStatus.OK).body("Collaboration terminated");
    }

    @PostMapping("/feedback/{collaborationId}/{tuteeId}")
    public ResponseEntity<?> submitFeedback(@PathVariable Long collaborationId, @PathVariable Long tuteeId,
            @RequestBody Feedback feedback, HttpServletRequest request) {
        // AuthenticatedUserBody authenticatedUser =
        // AuthUser.getAuthenticatedUser(request);

        collaborationService.submitFeedback(collaborationId, tuteeId, feedback);
        return ResponseEntity.status(HttpStatus.OK).body("Feedback submitted");
    }
}
