package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Tutee;

public interface TuteeRepository extends JpaRepository<Tutee, Long> {
    // Custom queries for tutees
    
}
