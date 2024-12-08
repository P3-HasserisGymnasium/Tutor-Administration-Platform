package project.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.role_controller.TuteeProfileResponse;
import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.Administrator;
import project.backend.model.Collaboration;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.repository.AccountRepository;
import project.backend.repository.AdministratorRepository;
import project.backend.repository.RoleRepository;
import project.backend.repository.StudentRepository;
import project.backend.repository.TutorRepository;

@Service
public class RoleService {

    @Autowired
    final RoleRepository roleRepository;

    @Autowired
    final StudentRepository studentRepository;

    @Autowired
    final TutorRepository tutorRepository;

    @Autowired
    final AccountRepository accountRepository;

    @Autowired
    final AdministratorRepository administratorRepository;

    public RoleService(RoleRepository roleRepository, StudentRepository studentRepository, TutorRepository tutorRepository, AdministratorRepository administratorRepository, AccountRepository accountRepository) {
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
        this.administratorRepository = administratorRepository;
        this.accountRepository = accountRepository;
    }

    public List<Student> getTutees() {
        return studentRepository.getTutees();
    }

    public List<Student> getTutors() {
        return studentRepository.getTutors();
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Tutee getTuteeById(Long id){
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + id));

        Tutee tutee = student.getTutee();
        if (tutee == null){
            throw new IllegalArgumentException("This student is not assigned a Tutee");
        }

        return tutee;
    }

    public Tutor getTutorByUserId(Long userId){
        Student student = studentRepository.findById(userId).orElse(null);
        
        Tutor tutor = student.getTutor();
        if (tutor == null){
            return null;
        }

        return tutor;
    }

    public Tutee getTuteeByUserId(Long userId){

        Student student = studentRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + userId));
        
        Tutee tutee = student.getTutee();
        if (tutee == null){
            throw new IllegalArgumentException("This student is not assigned a Tutee");
        }

        return tutee;
    }

    public Administrator getAdministratorByUserId(Long userId){
        return administratorRepository.findById(userId)
            .orElse(null);
    }

    public Tutor getTutorById(Long tutorId){
        return tutorRepository.findById(tutorId)
            .orElseThrow(() -> new IllegalArgumentException("Tutor not found with ID: " + tutorId));
    }

    public Student getStudentById(Long id) {
        Optional<Student> studentOpt = studentRepository.findById(id);

        if (!studentOpt.isPresent()) {
            throw new IllegalArgumentException("Student not found wiht ID: " + id);
        }

        return studentOpt.get();
    }

    public RoleEnum[] getRolesByUserId(Long id) {
        Student student = getStudentById(id);
        Tutor tutor = student.getTutor();
        Tutee tutee = student.getTutee();

        if (tutor != null && tutee != null) {
            return new RoleEnum[] { RoleEnum.Tutor, RoleEnum.Tutee };
        } else if (tutor != null) {
            return new RoleEnum[] { RoleEnum.Tutor };
        } else if (tutee != null) {
            return new RoleEnum[] { RoleEnum.Tutee };
        } else {
            return new RoleEnum[] {};
        }

    }

    public void assignTuteeRole(Long id) {
        Student student = getStudentById(id);

        // Check if the student is already assigned as a Tutee
        if (student.getTutee() != null) {
            throw new IllegalArgumentException("This student is already assigned as a Tutee.");
        }

        Tutee tutee = new Tutee();
        tutee.setStudent(student);
        student.setTutee(tutee);
        studentRepository.save(student);

    }

    @Deprecated
    public Object getProfile(Long id, RoleEnum role) {
        Student student = getStudentById(id);


        if(role == RoleEnum.Tutee && student.getTutee() != null){
            return student.getTutee();
        } else if(role == RoleEnum.Tutor && student.getTutor() != null){
            return student.getTutor();
        } else {
            throw new IllegalArgumentException("Invalid role specified.");
        }
    }

    public TutorProfileResponse getTutorProfile(Long id) {
        Tutor tutor = getTutorByUserId(id);

        TutorProfileResponse response = new TutorProfileResponse();
        response.full_name = tutor.getStudent()
            .getFullName();
        response.description = tutor.getProfileDescription();
        response.year_group = tutor.getStudent()
            .getYearGroup();
        response.tutoring_subjects = tutor.getTutoringSubjects();
        response.contact_info = tutor.getStudent()
            .getContactInfo();

        return response;
    }

    public TuteeProfileResponse getTuteeProfile(Long id) {
        Student student = studentRepository.getStudentByUserId(id);


        List<Collaboration> collaborations = student.getTutee().getCollaborations();
        List<SubjectEnum> subjects = collaborations.stream().map(collab -> collab.getSubject()).toList();

        TuteeProfileResponse response = new TuteeProfileResponse();
        response.full_name = student.getFullName();
        response.year_group = student.getYearGroup();
        response.contact_info = student.getContactInfo();
        response.languages = student.getLanguages();
        response.subjects_taught_in = subjects;

        return response;
    }

    public void editProfile(Long id) {
        Student student = getStudentById(id);

        saveStudent(student);
    }

    public void removeRole(Long id, RoleEnum role) {
        Student student = getStudentById(id);

        if (role == RoleEnum.Tutee && student.getTutee() != null){
            student.setTutee(null);
            saveStudent(student);

        }else if(role == RoleEnum.Tutor && student.getTutor() != null){
            student.setTutor(null);
            saveStudent(student);

        } else {
            throw new IllegalArgumentException("Invalid role specified.");
        }
    }

}
