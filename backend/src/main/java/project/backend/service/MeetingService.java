package project.backend.service;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Meeting;
import project.backend.model.MeetingEnum;
import project.backend.repository.MeetingRepository;

@Service
public class MeetingService {
    
    @Autowired
    final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
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
        return meetingRepository.save(meeting);
    }

    public Meeting acceptMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.ACCEPTED);
        return meetingRepository.save(meeting);
    }

    public Meeting rejectMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.REJECTED);
        return meetingRepository.save(meeting);
    }

    public void postponeMeeting(Timestamp newStart, Timestamp newEnd, Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.postponeMeeting(newStart, newEnd);
        meetingRepository.save(meeting);
    }

    public void cancelMeeting(Long id) {
        Meeting meeting = meetingRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Meeting with ID " + id + " not found"));
        meeting.setMeetingState(MeetingEnum.FINISHED);
        meetingRepository.save(meeting);
    }

    public void deleteMeetingById(Long id) {
        meetingRepository.deleteById(id);
    }   
}
