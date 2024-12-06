package project.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;


import project.backend.model.Meeting;
import project.backend.service.MeetingService;
import project.backend.controller_bodies.meeting_controller.MeetingCancelRequestBody;

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

    @GetMapping("/all/{id}")
    public Meeting[] getMeetings(@PathVariable Long id) {
        return meetingService.getMeetingsById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingService.saveMeeting(meeting);
    }
    */

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeetingById(id);
    }

    @PutMapping("/accept/{id}")
    public void acceptMeeting(@PathVariable Long id){
        meetingService.acceptMeeting(id);
    }

    @PutMapping("/reject/{id}")
    public void rejectMeeting(@PathVariable Long id){
        meetingService.rejectMeeting(id);
    }

    @PutMapping("/cancel/{id}")
    public void cancelMeeting(@PathVariable Long id, @RequestBody MeetingCancelRequestBody cancelRequest){
        meetingService.cancelMeeting(id, 
        cancelRequest.senderId, cancelRequest.senderRole, 
        cancelRequest.receiverId, cancelRequest.receiverRole);
    }





}
