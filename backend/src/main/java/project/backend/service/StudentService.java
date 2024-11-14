package project.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Schedule;
import project.backend.model.Student;
import project.backend.repository.ScheduleRepository;
import project.backend.repository.StudentRepository;

import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final ScheduleRepository scheduleRepository;

    // Constructor-based dependency injection
    @Autowired
    public StudentService(StudentRepository studentRepository, ScheduleRepository scheduleRepository) {
        this.studentRepository = studentRepository;
        this.scheduleRepository = scheduleRepository;
    }

    // Fetch a student by ID
    public Student getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.orElse(null); // Return the student if found, or null if not found
    }

    // Create or update a student
    public Student saveStudent(Student student) {
        return studentRepository.save(student); // Save the student and return the saved entity
    }

    // Delete a student by ID
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Assign a schedule to a student
    public Student assignScheduleToStudent(Long studentId, Long scheduleId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(scheduleId);

        if (studentOptional.isPresent() && scheduleOptional.isPresent()) {
            Student student = studentOptional.get();
            Schedule schedule = scheduleOptional.get();

            student.setSchedule(schedule); // Set the schedule to the student
            return studentRepository.save(student); // Save the updated student
        } else {
            return null; // Either student or schedule not found
        }
    }
}
