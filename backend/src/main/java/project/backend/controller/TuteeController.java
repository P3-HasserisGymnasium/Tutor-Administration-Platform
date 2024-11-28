package project.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Tutee;
import project.backend.service.TuteeService;

@RestController
@RequestMapping("/tutee")
public class TuteeController {

    final TuteeService tuteeService;

    public TuteeController(TuteeService tuteeService) {
        this.tuteeService = tuteeService;
    }

    @GetMapping("/{id}")
    public Tutee getTutee(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @PostMapping("/")
    public Tutee createTutee(@RequestBody Tutee tutee) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @DeleteMapping("/{id}")
    public void deleteTutee(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }
}