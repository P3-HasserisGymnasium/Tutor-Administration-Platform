package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Student;
import project.backend.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    // Constructor-based dependency injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Fetch a student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Create or update a student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Delete a student by ID
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public void deleteStudent(Student student) {
        studentRepository.delete(student);
    }
}
