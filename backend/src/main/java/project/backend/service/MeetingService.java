package project.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import project.backend.model.Meeting;
import project.backend.repository.MeetingRepository;

@Service
public class MeetingService {
    
    final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public Optional<Meeting> getMeetingById(Long id){
        return meetingRepository.findById(id);
    }

    public Meeting saveMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public void deleteMeetingById(Long id) {
        meetingRepository.deleteById(id);
    }
}
