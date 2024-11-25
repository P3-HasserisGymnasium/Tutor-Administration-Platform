package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Meeting;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    
}
