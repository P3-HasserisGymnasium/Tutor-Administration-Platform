package project.backend.controller;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getTutorTimeSlot(@PathVariable Long id) {
        try {
            TutorTimeSlot tutorTimeSlot = tutorTimeSlotService.getTutorTimeSlotById(id)
                .orElse(null);
            return ResponseEntity.ok(tutorTimeSlot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createTutorTimeSlot(@RequestBody TutorTimeSlot tutorTimeSlot) {
        try {
            TutorTimeSlot savedTutorTimeSlot = tutorTimeSlotService.saveTutorTimeSlot(tutorTimeSlot);
            return ResponseEntity.ok(savedTutorTimeSlot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTutorTimeSlot(@PathVariable Long id) {
        try {
            tutorTimeSlotService.deleteTutorTimeSlotById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}