package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // Custom queries for feedbacks
    
}
