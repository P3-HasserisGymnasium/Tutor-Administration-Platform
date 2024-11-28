package project.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.TutorApplication;
import project.backend.service.TutorApplicationService;

@RestController
@RequestMapping("/tutorApplication")
public class TutorApplicationController {
    
    final TutorApplicationService tutorApplicationService;

    public TutorApplicationController(TutorApplicationService tutorApplicationService) {
        this.tutorApplicationService = tutorApplicationService;
    }

    @GetMapping("/{id}")
    public TutorApplication getTutorApplication(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @PostMapping("/")
    public TutorApplication createTutorApplication(@RequestBody TutorApplication tutorApplication) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @DeleteMapping("/{id}")
    public void deleteTutorApplication(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }
}