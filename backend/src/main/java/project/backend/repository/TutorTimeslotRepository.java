package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.TutorTimeSlot;

public interface TutorTimeslotRepository extends JpaRepository<TutorTimeSlot, Long> {
    // Custom queries for tutor timeslots
    
}
