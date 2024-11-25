package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.TutorApplication;

public interface TutorApplicationRepository extends JpaRepository<TutorApplication, Long> {
    // Custom queries for tutor applications
    
}
