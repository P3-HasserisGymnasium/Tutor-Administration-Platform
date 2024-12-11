package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Tutee;
import project.backend.service.TuteeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tutee")
public class TuteeController {

    final TuteeService tuteeService;

    public TuteeController(TuteeService tuteeService) {
        this.tuteeService = tuteeService;
    }

    @GetMapping("/{id}")
    public Tutee getTutee(@PathVariable Long id) {
        return tuteeService.getTuteeById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public Tutee createTutee(@RequestBody Tutee tutee) {
        return tuteeService.saveTutee(tutee);
    }

    @DeleteMapping("/{id}")
    public void deleteTutee(@PathVariable Long id) {
        tuteeService.deleteTuteeById(id);
    }
}