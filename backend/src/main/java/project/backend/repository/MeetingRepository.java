package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.backend.model.Meeting;
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // Custom queries for meetings

    // Find all meetings by collaboration id
    @Query("SELECT m FROM Meeting m WHERE m.collaboration.id = ?1")
    Iterable<Meeting> findMeetingsByCollaborationId(Long collaboration_id);

    @Query("SELECT m FROM Meeting m WHERE m.collaboration.tutor.id = ?1")
    Iterable<Meeting> findMeetingsByTutorId(Long tutor_id);

    @Query("SELECT m FROM Meeting m WHERE m.collaboration.tutee.id = ?1 OR m.collaboration.tutor.id = ?1")
    Iterable<Meeting> findMeetingsByTuteeOrTutorId(Long tutee_id);
       
}
