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

import project.backend.controller_bodies.tutor_application_controller.TutorApplicationCreateBody;
import project.backend.model.TutorApplication;
import project.backend.model.SubjectEnum;
import project.backend.service.TutorApplicationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tutor-application")
public class TutorApplicationController {
    
    final TutorApplicationService tutorApplicationService;

    public TutorApplicationController(TutorApplicationService tutorApplicationService) {
        this.tutorApplicationService = tutorApplicationService;
    }

    @GetMapping("/{id}")
    public TutorApplication getTutorApplication(@PathVariable Long id) {
        return tutorApplicationService.getTutorApplicationById(id);
    }

    @GetMapping("/all")
    public List<TutorApplication> getAllTutorApplications() {
        return tutorApplicationService.getAllTutorApplications();
    }

    @PostMapping("/")
    public TutorApplication createTutorApplication(@RequestBody TutorApplicationCreateBody body) {
        return tutorApplicationService.createTutorApplication(body);
    }

    @DeleteMapping("/{id}")
    public void deleteTutorApplication(@PathVariable Long id) {
        tutorApplicationService.deleteTutorApplicationById(id);
    }

    @PostMapping("/accept-tutor-application/{id}")
    public void acceptTutorApplication(@PathVariable Long id){
        tutorApplicationService.acceptTutorApplication(id);
    }

    @PostMapping("/reject-tutor-application/{id}")
    public void rejectTutorApplication(@PathVariable Long id, @RequestBody String rejectReason){
        tutorApplicationService.rejectTutorApplication(id, rejectReason);
    }

    @PostMapping("/remove-subject/{id}")
    public void removeSubject(@PathVariable Long id, @RequestBody SubjectEnum subject){
        tutorApplicationService.removeTutoringSubject(id, subject);
    }
}
