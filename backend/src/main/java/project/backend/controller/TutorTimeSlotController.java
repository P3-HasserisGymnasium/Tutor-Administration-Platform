package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.TutorTimeSlot;
import project.backend.service.TutorTimeSlotService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tutorTimeSlot")
public class TutorTimeSlotController {
    
    final TutorTimeSlotService tutorTimeSlotService;

    public TutorTimeSlotController(TutorTimeSlotService tutorTimeSlotService) {
        this.tutorTimeSlotService = tutorTimeSlotService;
    }

    @GetMapping("/{id}")
    public TutorTimeSlot getTutorTimeSlot(@PathVariable Long id) {
        return tutorTimeSlotService.getTutorTimeSlotById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public TutorTimeSlot createTutorTimeSlot(@RequestBody TutorTimeSlot tutorTimeSlot) {
        return tutorTimeSlotService.saveTutorTimeSlot(tutorTimeSlot);
    }

    @DeleteMapping("/{id}")
    public void deleteTutorTimeSlot(@PathVariable Long id) {
        tutorTimeSlotService.deleteTutorTimeSlotById(id);
    }
}