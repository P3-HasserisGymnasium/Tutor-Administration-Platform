package project.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Tutor;
import project.backend.service.TutorService;

@RestController
@RequestMapping("/tutor")
public class TutorController {

    final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    @GetMapping("/{id}")
    public Tutor getTutor(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @PostMapping("/")
    public Tutor createTutor(@RequestBody Tutor tutor) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @DeleteMapping("/{id}")
    public void deleteTutor(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }
}