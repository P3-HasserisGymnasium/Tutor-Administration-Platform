package project.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;


import project.backend.model.Collaboration;
import project.backend.model.Meeting;
import project.backend.service.CollaborationService;
import project.backend.service.MeetingService;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.meeting_controller.MeetingBody;
import project.backend.utilities.HelperFunctions;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/meeting")
public class MeetingController {

    final MeetingService meetingService;
    final CollaborationService collaborationService;
    private final HelperFunctions helperFunctions;

    public MeetingController(MeetingService meetingService, HelperFunctions helperFunctions, CollaborationService collaborationService) {
        this.meetingService = meetingService;
        this.helperFunctions = helperFunctions;
        this.collaborationService = collaborationService;
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

    @GetMapping("")
    public ResponseEntity<?> getMeetings(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Iterable<Meeting> tuteeMetings = meetingService.getMeetingsByTuteeId(authenticatedUser.getTuteeId());
        Iterable<Meeting> tutorMeetings = meetingService.getMeetingsByTutorId(authenticatedUser.getTutorId());

        List<Meeting> joinedMeetings = new ArrayList<>();
        tuteeMetings.forEach(joinedMeetings::add);
        tutorMeetings.forEach(joinedMeetings::add);

        return ResponseEntity.status(HttpStatus.OK).body(joinedMeetings);
    }

    @GetMapping("/tutee")
    public ResponseEntity<?> getTuteeMeetings(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutee()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view these meetings");
        }

        Iterable<Meeting> meetings = meetingService.getMeetingsByTuteeId(authenticatedUser.getTuteeId());

        return ResponseEntity.status(HttpStatus.OK).body(meetings);
    }

    @GetMapping("/tutor")
    public ResponseEntity<?> getTutorMeetings(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view these meetings");
        }

        Iterable<Meeting> meetings = meetingService.getMeetingsByTutorId(authenticatedUser.getTutorId());

        return ResponseEntity.status(HttpStatus.OK).body(meetings);
    }

    @PostMapping("/request")
    public ResponseEntity<String> requestMeeting(@RequestBody MeetingBody meeting, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        System.out.println(meeting);
        System.out.println("ussr" + authenticatedUser);

        Collaboration collaboration = collaborationService.getCollaborationById(meeting.id);

        if (collaboration == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collaboration not found");
        }

        if (!helperFunctions.isUserPermitted(authenticatedUser, collaboration.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to create this meeting");
        }

        Meeting newMeeting = new Meeting();
        newMeeting.setCollaboration(collaboration);
        newMeeting.setMeetingState(meeting.state);
        newMeeting.setStartTimestamp(meeting.start_date);
        newMeeting.setEndTimestamp(meeting.end_date);
        newMeeting.setMeetingDescription(meeting.meeting_description);

        String message = "Meeting request sent";

        meetingService.saveMeeting(newMeeting);

        return ResponseEntity.ok(message);
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
