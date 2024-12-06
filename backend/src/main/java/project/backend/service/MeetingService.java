package project.backend.service;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Meeting;
import project.backend.model.MeetingEnum;
import project.backend.model.Collaboration;
import project.backend.model.EntityType;
import project.backend.model.NotificationType;
import project.backend.model.RoleEnum;
import project.backend.repository.MeetingRepository;

@Service
public class MeetingService {
    
    @Autowired
    final MeetingRepository meetingRepository;

    @Autowired 
    final NotificationService notificationService;

    public MeetingService(MeetingRepository meetingRepository, NotificationService notificationService) {
        this.meetingRepository = meetingRepository;
        this.notificationService = notificationService;
    }

    public Optional<Meeting> getMeetingById(Long id){
        return meetingRepository.findById(id);
    }

    public Optional<Meeting[]> getMeetingsById(Long id) {
        return meetingRepository.findMeetingsById(id);
    }

    public Meeting requestMeeting(Meeting meetingParam) { // needs other input eventually, ask thomas for params
        Meeting meeting = new Meeting(); // needs params to be set but w/e for now
        meeting.setMeetingState(MeetingEnum.PENDING);


        // notify tutor of meeting request
        Long tuteeId = meeting.getCollaboration().getTutee().getId();
        Long tutorId = meeting.getCollaboration().getTutor().getId();
        notificationService.sendNotification(tuteeId, EntityType.TUTEE, tutorId, EntityType.TUTOR,
        meeting.getId(), EntityType.MEETING); 

        return meetingRepository.save(meeting);
    }

    public void deleteMeetingById(Long id) {
        meetingRepository.deleteById(id);
    }  

    public Meeting acceptMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.ACCEPTED);

        // notify tutee of tutor accepting meeting
        Long tuteeId = meeting.getCollaboration().getTutee().getId();
        Long tutorId = meeting.getCollaboration().getTutor().getId();
        notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, 
        meeting.getId(), EntityType.MEETING); 


        return meetingRepository.save(meeting);
    }

    public Meeting rejectMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.REJECTED);

        // notify tutee of tutor rejecting meeting
        Long tuteeId = meeting.getCollaboration().getTutee().getId();
        Long tutorId = meeting.getCollaboration().getTutor().getId();
        notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, 
        meeting.getId(), EntityType.MEETING); 
        
        return meetingRepository.save(meeting);
    }


    public void cancelMeeting(Long id, Long senderId, EntityType senderRole, Long receiverId, EntityType receiverRole) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.FINISHED);

        notificationService.sendNotification(senderId, senderRole, receiverId, receiverRole, 
        meeting.getId(), EntityType.MEETING); 

    
        meetingRepository.save(meeting);
    }

    // not part of the class-diagram
    public void postponeMeeting(Timestamp newStart, Timestamp newEnd, Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.postponeMeeting(newStart, newEnd);
        meetingRepository.save(meeting);
    }

     
}
