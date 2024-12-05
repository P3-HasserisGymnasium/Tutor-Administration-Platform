package project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.backend.model.Collaboration;

public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
    // Custom queries for collaborations
    
    // Find all collaborations with tutor id
    @Query("SELECT c FROM Collaboration c WHERE c.tutor.id = ?1")
    public List<Collaboration> findCollaborationsWithTutorId(Long tutorId);

    // Find all collaborations with tutee id
    @Query("SELECT c FROM Collaboration c WHERE c.tutee.id = ?1")
    public List<Collaboration> findCollaborationsWithTuteeId(Long tuteeId);
}
