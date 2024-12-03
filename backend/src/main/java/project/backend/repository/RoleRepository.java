package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import project.backend.model.Student;

public interface RoleRepository extends JpaRepository<Student, Long> {
    // Custom queries can be added here

    @Query("SELECT s FROM Student s WHERE s.tutee IS NOT NULL")
    List<Student> getTutees();

    @Query("SELECT s FROM Student s WHERE s.tutor IS NOT NULL")
    List<Student> getTutors();

}
