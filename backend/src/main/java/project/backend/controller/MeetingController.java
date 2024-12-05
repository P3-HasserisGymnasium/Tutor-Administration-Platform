package project.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Meeting;
import project.backend.service.MeetingService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/meeting")
public class MeetingController {

    final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/{id}")
    public Meeting getMeeting(@PathVariable Long id) {
        return meetingService.getMeetingById(id)
            .orElse(null);
    }

    @GetMapping("/forCollaboration/{id}")
    public List<Meeting> getMeetings(@PathVariable Long id) {
        return meetingService.getMeetingsByCollaborationId(id);
    }

    @PostMapping("/")
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingService.saveMeeting(meeting);
    }
    
    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeetingById(id);
    }
}