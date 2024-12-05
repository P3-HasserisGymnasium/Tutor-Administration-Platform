package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.backend.model.Meeting;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // Custom queries for meetings

    // Find all meetings by collaboration id
    @Query("SELECT m FROM Meeting m WHERE m.collaboration.id = ?1")
    List<Meeting> findMeetingsByCollaborationId(Long collaboration_id);
       
}
