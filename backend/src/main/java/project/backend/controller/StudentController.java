package project.backend.controller;

import org.springframework.web.bind.annotation.*;

import project.backend.model.Student;
import project.backend.service.StudentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping("/")
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
