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

import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.Collaboration;
import project.backend.model.Meeting;
import project.backend.model.MeetingEnum;
import project.backend.service.CollaborationService;
import project.backend.service.MeetingService;
import project.backend.service.RoleService;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.meeting_controller.MeetingBody;
import project.backend.controller_bodies.meeting_controller.MeetingResponseBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/meeting")
public class MeetingController {

    final MeetingService meetingService;
    final CollaborationService collaborationService;
    final RoleService roleService;

    public MeetingController(MeetingService meetingService, CollaborationService collaborationService,RoleService roleService ) {

        this.meetingService = meetingService;
        this.collaborationService = collaborationService;
        this.roleService = roleService;
;
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


         Iterable<MeetingResponseBody> meetingResponses = new ArrayList<>();

        for (Meeting meeting : joinedMeetings) {

            Tutee tutee = meeting.getCollaboration().getTutee();
            Tutor tutor = meeting.getCollaboration().getTutor();

            MeetingResponseBody meetingResponse = new MeetingResponseBody();
            meetingResponse.id = meeting.getId();
            meetingResponse.collaboration_id = meeting.getCollaboration().getId();
            meetingResponse.start_date = meeting.getStartTimestamp();
            meetingResponse.end_date = meeting.getEndTimestamp();
            meetingResponse.state = meeting.getMeetingState().toString();
            meetingResponse.rejection_reason = meeting.getRejectionReason();
            meetingResponse.meeting_description = meeting.getMeetingDescription();
            meetingResponse.tutee_user_id = tutee.getId();
            meetingResponse.tutor_user_id = tutor.getId();
            meetingResponse.tutee_name = tutee.getStudent().getFullName();
            meetingResponse.tutor_name = tutor.getStudent().getFullName();
            ((ArrayList<MeetingResponseBody>) meetingResponses).add(meetingResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(meetingResponses);
    }

    @GetMapping("/self/all")
    public ResponseEntity<?> getAllMeetings(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        ArrayList<Meeting> tutorMeetings = new ArrayList<>();
        ArrayList<Meeting> tuteeMeetings = new ArrayList<>();
        if (authenticatedUser.isTutor()) {
            tutorMeetings = (ArrayList<Meeting>) meetingService.getMeetingsByTutorId(authenticatedUser.getTutorId());
        }
        if (authenticatedUser.isTutee()) {
            tuteeMeetings = (ArrayList<Meeting>) meetingService.getMeetingsByTuteeId(authenticatedUser.getTuteeId());
        }

        ArrayList<Meeting> meetings = new ArrayList<>();
        meetings.addAll(tutorMeetings);
        meetings.addAll(tuteeMeetings);

        ArrayList<MeetingResponseBody> meetingResponses = new ArrayList<>();

        for (Meeting meeting : meetings) {

            Tutee tutee = meeting.getCollaboration().getTutee();
            Tutor tutor = meeting.getCollaboration().getTutor();

            MeetingResponseBody meetingResponse = new MeetingResponseBody();
            meetingResponse.id = meeting.getId();
            meetingResponse.collaboration_id = meeting.getCollaboration().getId();
            meetingResponse.start_date = meeting.getStartTimestamp();
            meetingResponse.end_date = meeting.getEndTimestamp();
            meetingResponse.state = meeting.getMeetingState().toString();
            meetingResponse.rejection_reason = meeting.getRejectionReason();
            meetingResponse.meeting_description = meeting.getMeetingDescription();
            meetingResponse.tutee_user_id = tutee.getId();
            meetingResponse.tutor_user_id = tutor.getId();
            meetingResponse.tutee_name = tutee.getStudent().getFullName();
            meetingResponse.tutor_name = tutor.getStudent().getFullName();
            meetingResponses.add(meetingResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(meetingResponses);
    }

    @GetMapping("/tutee")
    public ResponseEntity<?> getTuteeMeetings(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutee()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view these meetings");
        }

        Iterable<Meeting> meetings = meetingService.getMeetingsByTuteeId(authenticatedUser.getTuteeId());

        Iterable<MeetingResponseBody> meetingResponses = new ArrayList<>();

        for (Meeting meeting : meetings) {

            Tutee tutee = meeting.getCollaboration().getTutee();
            Tutor tutor = meeting.getCollaboration().getTutor();

            MeetingResponseBody meetingResponse = new MeetingResponseBody();
            meetingResponse.id = meeting.getId();
            meetingResponse.collaboration_id = meeting.getCollaboration().getId();
            meetingResponse.start_date = meeting.getStartTimestamp();
            meetingResponse.end_date = meeting.getEndTimestamp() ;
            meetingResponse.state = meeting.getMeetingState().toString();
            meetingResponse.rejection_reason = meeting.getRejectionReason();
            meetingResponse.meeting_description = meeting.getMeetingDescription();
            meetingResponse.tutee_user_id = tutee.getId();
            meetingResponse.tutor_user_id = tutor.getId();
            meetingResponse.tutee_name = tutee.getStudent().getFullName();
            meetingResponse.tutor_name = tutor.getStudent().getFullName();
            ((ArrayList<MeetingResponseBody>) meetingResponses).add(meetingResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(meetingResponses);
    }

    @GetMapping("/tutor")
    public ResponseEntity<?> getTutorMeetings(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not authorized to view these meetings");
        }

        Iterable<Meeting> meetings = meetingService.getMeetingsByTutorId(authenticatedUser.getTutorId());

        Iterable<MeetingResponseBody> meetingResponses = new ArrayList<>();

        for (Meeting meeting : meetings) {

            Tutee tutee = meeting.getCollaboration().getTutee();
            Tutor tutor = meeting.getCollaboration().getTutor();

            MeetingResponseBody meetingResponse = new MeetingResponseBody();
            meetingResponse.id = meeting.getId();
            meetingResponse.collaboration_id = meeting.getCollaboration().getId();
            meetingResponse.start_date = meeting.getStartTimestamp();
            meetingResponse.end_date = meeting.getEndTimestamp();
            meetingResponse.state = meeting.getMeetingState().toString();
            meetingResponse.rejection_reason = meeting.getRejectionReason();
            meetingResponse.meeting_description = meeting.getMeetingDescription();
            meetingResponse.tutee_user_id = tutee.getId();
            meetingResponse.tutor_user_id = tutor.getId();
            meetingResponse.tutee_name = tutee.getStudent().getFullName();
            meetingResponse.tutor_name = tutor.getStudent().getFullName();
            ((ArrayList<MeetingResponseBody>) meetingResponses).add(meetingResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(meetingResponses);
    }

    @PostMapping("/request")
    public ResponseEntity<String> requestMeeting(@RequestBody MeetingBody body, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        System.out.println(body);
        System.out.println("ussr" + authenticatedUser);

        Collaboration collaboration = collaborationService.getCollaborationById(body.collaboration);

        if (collaboration == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collaboration not found");
        }

        Meeting newMeeting = new Meeting();
        newMeeting.setCollaboration(collaboration);
        newMeeting.setMeetingState(MeetingEnum.PENDING);
        newMeeting.setStartTimestamp(body.start_date);
        newMeeting.setEndTimestamp(body.end_date);
        newMeeting.setMeetingDescription(body.meeting_description);

        try {
            meetingService.saveMeeting(newMeeting);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body("Meeting request sent");
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

        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        meetingService.cancelMeeting(id);

        return ResponseEntity.status(HttpStatus.OK).body("Meeting cancelled");
    }


}
