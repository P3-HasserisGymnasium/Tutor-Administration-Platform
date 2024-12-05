package project.backend.controller;

import java.util.List;

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
    public Collaboration getCollaboration(@PathVariable Long id) {
        return collaborationService.getCollaborationById(id);
    }

    @GetMapping("/with_tutor/{id}")
    public List<Collaboration> getCollaborationWithTutor(@PathVariable Long id) {
        return collaborationService.getCollaborationsWithTutor(id);
    }

    @GetMapping("/with_tutee/{id}")
    public List<Collaboration> getCollaborationWithTutee(@PathVariable Long id) {
        return collaborationService.getCollaborationsWithTutee(id);
    }

    @GetMapping("/all")
    public List<Collaboration> getAllCollaborations() {
        return collaborationService.getAllCollaborations();
    }

    @PostMapping("/")
    public Collaboration createCollaboration(@RequestBody CollaborationCreateBody body) {
        return collaborationService.createCollaboration(body);
    }

    @DeleteMapping("/{id}")
    public void deleteCollaboration(@PathVariable Long id) {
        collaborationService.deleteCollaborationById(id);
    }
}