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
import project.backend.model.Feedback;
import project.backend.model.SubjectEnum;
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

    @PostMapping("/request-suggestion/{id}")
    public void requestCollaborationSuggestion(@PathVariable Long tuteeId, @RequestBody SubjectEnum subject){
        collaborationService.requestCollaborationSuggestion(tuteeId, subject);
    }

    @PostMapping("/submit-suggestion/{collaborationId}/{tutorId}")
    public void submitCollaborationSuggestion(@PathVariable Long collaborationId, @PathVariable Long tutorId){
        collaborationService.submitCollaborationSuggestion(collaborationId, tutorId);
    }

    @PostMapping("/accept/{collaborationId}")
    public void acceptCollaboration(@PathVariable Long collaborationId, @RequestBody RoleEnum role){
        collaborationService.acceptCollaboration(collaborationId, role);
    }

    @PostMapping("reject/{collaborationId}")
    public void rejectCollaboration(@PathVariable Long collaborationId, @RequestBody RoleEnum role){
        collaborationService.rejectCollaboration(collaborationId, role);
    }

    @PostMapping("/terminate/{collaborationId}")
    public void terminateCollaboration(@PathVariable Long collaborationId, @RequestBody String terminationReason) {
        collaborationService.terminateCollaboration(collaborationId, terminationReason);
    }

    @PostMapping("/establish/{collaborationId}")
    public void establishCollaboration(@PathVariable Long collaborationId) {
        collaborationService.establishCollaboration(collaborationId);
    }

    @PostMapping("/feedback/{collaborationId}/{tuteeId}")
        public void submitFeedback(@PathVariable Long collaborationId, @PathVariable Long tuteeId, @RequestBody Feedback feedback) {
        collaborationService.submitFeedback(collaborationId, tuteeId, feedback);
}



}
