package project.backend.controller;

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
import project.backend.controller_bodies.tutor_application_controller.TutorApplicationCreateBody;
import project.backend.model.RoleEnum;
import project.backend.service.NotificationService;
import project.backend.service.TutorApplicationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tutor-application")
public class TutorApplicationController {
    
    final TutorApplicationService tutorApplicationService;

    final NotificationService notificationService;

    public TutorApplicationController(TutorApplicationService tutorApplicationService, NotificationService notificationService) {
        this.tutorApplicationService = tutorApplicationService;
        this.notificationService = notificationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTutorApplication(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view this tutor application");

        }

        return ResponseEntity.status(HttpStatus.OK).body(tutorApplicationService.getTutorApplicationById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTutorApplications(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view all tutor applications");
        }

        return ResponseEntity.status(HttpStatus.OK).body(tutorApplicationService.getAllTutorApplications());
    }

    @PostMapping("/{role}")
    public ResponseEntity<?> createTutorApplication(@RequestBody TutorApplicationCreateBody body, @PathVariable RoleEnum role, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);



        if (!authenticatedUser.isTutee() && !authenticatedUser.isTutor()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to create a tutor application");
        }


        try {
            if (role == RoleEnum.Tutor) {
                tutorApplicationService.createTutorApplication(body, role, authenticatedUser.getTutorId());
                return ResponseEntity.status(HttpStatus.OK).body("Tutor application created");
            } else if (role == RoleEnum.Tutee) {
                tutorApplicationService.createTutorApplication(body, role, authenticatedUser.getTuteeId());
                return ResponseEntity.status(HttpStatus.OK).body("Tutor application created");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role");
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTutorApplication(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to delete this tutor application");
        }

        tutorApplicationService.deleteTutorApplicationById(id);

        return ResponseEntity.status(HttpStatus.OK).body("Tutor application deleted");
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<?>  acceptTutorApplication(@PathVariable Long id, HttpServletRequest request){
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to accept this tutor application");
        }

        tutorApplicationService.acceptTutorApplication(id);

        return ResponseEntity.status(HttpStatus.OK).body("Tutor application accepted");
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<?>  rejectTutorApplication(@PathVariable Long id, @RequestBody String rejectReason, HttpServletRequest request){
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to reject this tutor application");
        }

        tutorApplicationService.rejectTutorApplication(id, rejectReason);

        return ResponseEntity.status(HttpStatus.OK).body("Tutor application rejected");
    }
}
