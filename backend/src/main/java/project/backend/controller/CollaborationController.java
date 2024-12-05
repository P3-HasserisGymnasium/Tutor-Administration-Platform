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

import project.backend.controller_bodies.collaboration_bodies.CollaborationCreateBody;
import project.backend.model.Collaboration;
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
    public ResponseEntity<?> getCollaboration(@PathVariable Long id) {
        try {
            Collaboration response = collaborationService.getCollaborationById(id);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/with_tutor/{id}")
    public ResponseEntity<?> getCollaborationWithTutor(@PathVariable Long id) {
        try {
            List<Collaboration> response = collaborationService.getCollaborationsWithTutor(id);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/with_tutee/{id}")
    public ResponseEntity<?> getCollaborationWithTutee(@PathVariable Long id) {
        try {
            List<Collaboration> response = collaborationService.getCollaborationsWithTutee(id);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCollaborations() {
        try {
            List<Collaboration> response = collaborationService.getAllCollaborations();
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createCollaboration(@RequestBody CollaborationCreateBody body) {
        try {
            Collaboration response = collaborationService.createCollaboration(body);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollaboration(@PathVariable Long id) {
        try {
            collaborationService.deleteCollaborationById(id);
            return ResponseEntity.ok("Collaboration deleted successfully");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}