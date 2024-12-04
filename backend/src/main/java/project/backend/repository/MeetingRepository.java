package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Meeting;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // Custom queries for meetings

    Optional<Meeting[]> findMeetingsById(Long id);
       
}
