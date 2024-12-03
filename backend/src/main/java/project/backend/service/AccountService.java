package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.AccountRegisterBody;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.User;
import project.backend.repository.AccountRepository;
import project.backend.repository.StudentRepository;
import project.backend.repository.TuteeRepository;
import project.backend.repository.TutorRepository;
import project.backend.utilities.PasswordUtility;

@Service
public class AccountService {

    @Autowired
    final AccountRepository accountRepository;

    @Autowired
    final StudentRepository studentRepository;

    @Autowired
    final TutorRepository tutorRepository;

    @Autowired
    final TuteeRepository tuteeRepository;

    public AccountService(AccountRepository accountRepository, StudentRepository studentRepository, TutorRepository tutorRepository, TuteeRepository tuteeRepository) {
        this.accountRepository = accountRepository;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
        this.tuteeRepository = tuteeRepository;
    }

    public Optional<User> getUserById(Long id) {
        return accountRepository.findById(id);
    }

    public User saveNewUser(AccountRegisterBody body) {

        Student newStudent = new Student();

        newStudent.setFullName(body.fullName);
        newStudent.setEmail(body.email);
        
        String passwordHash = PasswordUtility.encodePassword(body.password);
        newStudent.setPasswordHash(passwordHash);

        newStudent.setLanguages(body.languages);
        newStudent.setYearGroup(body.yearGroup);
        
        Student savedStudent = studentRepository.save(newStudent);

        // if tutor role is selected, create a new tutor object
        if (body.roles.contains(RoleEnum.Tutor)) {
            Tutor newTutor = new Tutor();

            newTutor.setTutoringSubjects(body.tutorSubjects);
            newTutor.setStudent(savedStudent);

            savedStudent.setTutor(newTutor);
            tutorRepository.save(newTutor);
        }
        // if tutee role is selected, create a new tutee object
        if (body.roles.contains(RoleEnum.Tutee)) {
            Tutee newTutee = new Tutee();

            newTutee.setStudent(savedStudent);

            savedStudent.setTutee(newTutee);  
            tuteeRepository.save(newTutee);
        }

        return savedStudent;
    }

    public void deleteUserById(Long id) {
        accountRepository.deleteById(id);
    }

    public Optional<User> checkPassword(String email, String password) {
        
        User user = accountRepository.findByEmail(email);
        if (user != null && PasswordUtility.matches(password, user.getPasswordHash())) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

}
