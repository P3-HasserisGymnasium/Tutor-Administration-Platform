package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    // Custom queries for tutors    
    
}
