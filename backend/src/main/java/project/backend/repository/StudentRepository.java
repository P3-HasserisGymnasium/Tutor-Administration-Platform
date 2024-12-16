package project.backend.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom queries for students

    @Query("SELECT s FROM Student s WHERE s.tutee IS NOT NULL")
    Student[] getTutees();

    @Query("SELECT s FROM Student s WHERE s.tutor IS NOT NULL")
    ArrayList<Student> getTutors();

    Student getStudentById(Long userId);

    Student getStudentByTutorId(Long tutorId);

    Student getStudentByTuteeId(Long tuteeId);

}
