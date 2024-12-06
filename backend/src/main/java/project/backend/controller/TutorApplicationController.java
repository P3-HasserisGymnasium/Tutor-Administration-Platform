package project.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.controller_bodies.tutor_application_controller.TutorApplicationCreateBody;
import project.backend.model.TutorApplication;
import project.backend.service.TutorApplicationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tutorApplication")
public class TutorApplicationController {
    
    final TutorApplicationService tutorApplicationService;

    public TutorApplicationController(TutorApplicationService tutorApplicationService) {
        this.tutorApplicationService = tutorApplicationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTutorApplication(@PathVariable Long id) {
        try {
            TutorApplication tutorApplication = tutorApplicationService.getTutorApplicationById(id);
            return ResponseEntity.ok(tutorApplication);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTutorApplications() {
        try {
            List<TutorApplication> tutorApplications = tutorApplicationService.getAllTutorApplications();
            return ResponseEntity.ok(tutorApplications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createTutorApplication(@RequestBody TutorApplicationCreateBody body) {
        try {
            TutorApplication tutorApplication = tutorApplicationService.createTutorApplication(body);
            return ResponseEntity.ok(tutorApplication);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTutorApplication(@PathVariable Long id) {
        try {
            tutorApplicationService.deleteTutorApplicationById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}