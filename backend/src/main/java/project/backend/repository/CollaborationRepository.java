package project.backend.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.backend.model.Collaboration;
import project.backend.model.SubjectEnum;

public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
    // Custom queries for collaborations
    
    // Find all collaborations with tutor id
    @Query("SELECT c FROM Collaboration c WHERE c.tutor.id = ?1")
    public ArrayList<Collaboration> findCollaborationsWithTutorId(Long tutorId);

    // Find all collaborations with tutee id
    @Query("SELECT c FROM Collaboration c WHERE c.tutee.id = ?1")
    public ArrayList<Collaboration> findCollaborationsWithTuteeId(Long tuteeId);

    @Query("SELECT c FROM Collaboration c WHERE c.tutee.id = ?1 AND c.tutor.id = ?2 AND c.subject = ?3")
    public ArrayList<Collaboration> findByTuteeTutorAndSubject(Long tuteeId, Long tutorId, SubjectEnum subject);

    @Query("SELECT c FROM Collaboration c WHERE c.state = WAITING_FOR_ADMIN")
    public ArrayList<Collaboration> findByWaitingForAdmin();
}
