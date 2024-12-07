package project.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;


import project.backend.model.Collaboration;
import project.backend.model.Meeting;
import project.backend.service.MeetingService;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;

import project.backend.utilities.HelperFunctions;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/meeting")
public class MeetingController {

    final MeetingService meetingService;
    private final HelperFunctions helperFunctions;

    public MeetingController(MeetingService meetingService, HelperFunctions helperFunctions) {
        this.meetingService = meetingService;
        this.helperFunctions = helperFunctions;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMeeting(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        Meeting meeting = meetingService.getMeetingById(id).orElse(null);

        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meeting not found");
        }

        Collaboration collaboration = meeting.getCollaboration();
        if (authenticatedUser.getTutorId() == collaboration.getTutor().getId() || authenticatedUser.getTuteeId() == collaboration.getTutee().getId()) {
            return ResponseEntity.status(HttpStatus.OK).body(meeting);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view this meeting");
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getMeetings(@PathVariable Long userId, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view these meetings");
        }

        Iterable<Meeting> meetings = meetingService.getMeetingsById(userId);

        return ResponseEntity.status(HttpStatus.OK).body(meetings);
    }

    @PostMapping("/")
    public ResponseEntity<?> requestMeeting(@RequestBody Meeting meeting, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, meeting.getCollaboration().getTutee().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to create this meeting");
        }

        meetingService.saveMeeting(meeting);

        return ResponseEntity.status(HttpStatus.OK).body("Meeting created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to delete this meeting");
        }

        meetingService.deleteMeetingById(id);

        return ResponseEntity.status(HttpStatus.OK).body("Meeting deleted");
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<?> acceptMeeting(@PathVariable Long id, HttpServletRequest request) {

        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to accept this meeting");
        }

        meetingService.acceptMeeting(id);

        return ResponseEntity.status(HttpStatus.OK).body("Meeting accepted");
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectMeeting(@PathVariable Long id, HttpServletRequest request) {

        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to reject this meeting");
        }

        meetingService.rejectMeeting(id);

        return ResponseEntity.status(HttpStatus.OK).body("Meeting rejected");
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelMeeting(@PathVariable Long id, HttpServletRequest request) {

        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to cancel this meeting");
        }
        meetingService.cancelMeeting(id);

        return ResponseEntity.status(HttpStatus.OK).body("Meeting cancelled");
    }


}
