package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.account_controller.AccountLoginBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
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

    public boolean emailExists(String email) {
        return accountRepository.findByEmail(email) != null;
    }

    public Optional<User> getUserById(Long id) {
        return accountRepository.findById(id);
    }

    public User saveNewUser(AccountRegisterBody body) {

        if (emailExists(body.email)) {
            throw new EmailAlreadyExistsException("Email Already Exists");
        }

        boolean passwordsMatch = body.password.equals(body.confirmPassword);
        if (passwordsMatch == false) {
            throw new PasswordMismatchException("Passwords do not match");
        }

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
            newTutor.setProfileDescription(body.tutorProfileDescription);
            newTutor.setFreeTimeSlots(body.tutorTimeslots);

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

    public User getUserIfCorrectPassword(AccountLoginBody body) {

        User user = accountRepository.findByEmail(body.email);
        if (user == null) {
            throw new UserNotFoundException("Incorrect Password or Email");
        }
        if (PasswordUtility.matches(body.password, user.getPasswordHash()) == false) {
            throw new PasswordMismatchException("Incorrect Password or Email");            
        }

        return user;
    }

}
