package project.backend.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
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
    public ResponseEntity<?> getTutorTimeSlot(@PathVariable Long id, HttpServletRequest request) {


        Iterable<TutorTimeSlot> tutorTimeSlots = tutorTimeSlotService.getTutorTimeSlotById(id);


        if (tutorTimeSlots == null) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(tutorTimeSlots);

    }

    @PostMapping("/")
    public ResponseEntity<?> createTutorTimeSlot(@RequestBody TutorTimeSlot tutorTimeSlot, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor() || authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to create a tutor time slot.");
        }
        
        tutorTimeSlotService.saveTutorTimeSlot(tutorTimeSlot);

        return ResponseEntity.status(HttpStatus.CREATED).body("Tutor time slot created successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTutorTimeSlot(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor() || authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to delete a tutor time slot.");
        }

        tutorTimeSlotService.deleteTutorTimeSlotById(id);

        return ResponseEntity.status(HttpStatus.OK).body("Tutor time slot deleted successfully.");
    }
}
