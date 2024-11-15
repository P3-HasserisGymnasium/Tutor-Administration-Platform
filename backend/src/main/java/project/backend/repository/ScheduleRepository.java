package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // Custom queries can be added here
}
