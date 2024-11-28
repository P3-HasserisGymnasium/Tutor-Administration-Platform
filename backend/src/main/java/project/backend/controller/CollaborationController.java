package project.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Collaboration;
import project.backend.service.CollaborationService;

@RestController
@RequestMapping("/collaboration")
public class CollaborationController {
    
    private final CollaborationService collaborationService;

    public CollaborationController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @GetMapping("/{id}")
    public Collaboration getCollaboration(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @PostMapping("/")
    public Collaboration createCollaboration(@RequestBody Collaboration collaboration) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @DeleteMapping("/{id}")
    public void deleteCollaboration(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }
}