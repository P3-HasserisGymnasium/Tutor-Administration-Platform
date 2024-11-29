package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public TutorApplication getTutorApplication(@PathVariable Long id) {
        return tutorApplicationService.getTutorApplicationById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public TutorApplication createTutorApplication(@RequestBody TutorApplication tutorApplication) {
        return tutorApplicationService.saveTutorApplication(tutorApplication);
    }

    @DeleteMapping("/{id}")
    public void deleteTutorApplication(@PathVariable Long id) {
        tutorApplicationService.deleteTutorApplicationById(id);
    }
}