package project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Tutee;

public interface TuteeRepository extends JpaRepository<Tutee, Long> {
    // Custom queries for tutees

    Tutee getTuteeById(Long userId);

    Tutee getTuteeByStudentId(Long studentId);

    List<Tutee> findAll();
}
