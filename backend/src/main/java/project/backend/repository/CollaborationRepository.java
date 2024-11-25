package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Collaboration;

public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
    // Custom queries for collaborations
    
}
