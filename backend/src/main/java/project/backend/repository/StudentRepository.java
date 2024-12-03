package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom queries for students
}
