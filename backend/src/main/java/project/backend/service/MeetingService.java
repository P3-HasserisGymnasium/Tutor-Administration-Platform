package project.backend.service;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Meeting;
import project.backend.model.MeetingEnum;
import project.backend.model.EntityType;
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

    public Iterable<Meeting> getMeetingsById(Long id){
        return meetingRepository.findMeetingsByTuteeOrTutorId(id);
    }

    public Iterable<Meeting> getMeetingsByTutorId(Long tutorId) {
        return meetingRepository.findMeetingsByTutorId(tutorId);
    }

    public Iterable<Meeting> getMeetingsByTuteeId(Long tuteeId) {
        return meetingRepository.findMeetingsByTuteeId(tuteeId);
    }

    public Iterable<Meeting>  getMeetingsByCollaborationId(Long collaborationId) {
        return meetingRepository.findMeetingsByCollaborationId(collaborationId);
    }

    public Meeting saveMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public Meeting requestMeeting(Meeting meetingParam) {
        Meeting meeting = new Meeting();
        meeting.setMeetingState(MeetingEnum.PENDING);
        meeting.setStartTimestamp(meetingParam.getStartTimestamp());
        meeting.setEndTimestamp(meetingParam.getEndTimestamp());
        meeting.setMeetingDescription(meetingParam.getMeetingDescription());
        meeting.setCollaboration(meetingParam.getCollaboration());

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

        Long tuteeId = meeting.getCollaboration().getTutee().getId();
        Long tutorId = meeting.getCollaboration().getTutor().getId();
        notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, 
        meeting.getId(), EntityType.MEETING); 
        
        return meetingRepository.save(meeting);
    }


    public void cancelMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.FINISHED);

        Long tuteeId = meeting.getCollaboration().getTutee().getId();
        Long tutorId = meeting.getCollaboration().getTutor().getId();
        notificationService.sendNotification(tutorId, EntityType.TUTOR, tuteeId, EntityType.TUTEE, meeting.getId(), EntityType.MEETING);
    
        meetingRepository.save(meeting);
    }

    public void postponeMeeting(Timestamp newStart, Timestamp newEnd, Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.postponeMeeting(newStart, newEnd);
        meetingRepository.save(meeting);
    }

     
}
