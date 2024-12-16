package project.backend.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import static project.backend.utilities.JWTUtil.generateToken;

import project.backend.controller_bodies.account_controller.AccountLoginBody;
import project.backend.controller_bodies.account_controller.AccountLoginSuccessBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.controller_bodies.account_controller.TimeCreateBody;
import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
import project.backend.model.Administrator;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.TutorTimeSlot;
import project.backend.model.User;
import project.backend.repository.AccountRepository;
import project.backend.repository.StudentRepository;
import project.backend.repository.TuteeRepository;
import project.backend.repository.TutorRepository;
import project.backend.repository.TutorTimeslotRepository;
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

    @Autowired
    final TutorTimeslotRepository timeSlotRepository;

    @Autowired
    final RoleService roleService;

    public AccountService(AccountRepository accountRepository, StudentRepository studentRepository, TutorRepository tutorRepository, TuteeRepository tuteeRepository, TutorTimeslotRepository timeSlotRepository, RoleService roleService) {
        this.roleService = roleService;
        this.accountRepository = accountRepository;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
        this.tuteeRepository = tuteeRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    public boolean emailExists(String email) {
        return accountRepository.findByEmail(email) != null;
    }

    public Optional<User> getUserByEmail(String email) {
        return Optional.of(accountRepository.findByEmail(email));
    }

    public Optional<User> getUserById(Long id) {
        return accountRepository.findById(id);
    }

    public Administrator getAdminById(Long id) {
        return roleService.getAdministratorByUserId(id);
    }

    @Transactional
    public User saveNewStudent(AccountRegisterBody body) {

        if (emailExists(body.email)) throw new EmailAlreadyExistsException("Email Already Exists");
        if (!body.password.equals(body.confirm_password)) throw new PasswordMismatchException("Passwords do not match");


        Student newStudent = new Student();
        String passwordHash = PasswordUtility.encodePassword(body.password);
        newStudent.setFullName(body.full_name);
        newStudent.setEmail(body.email);
        newStudent.setPasswordHash(passwordHash);
        newStudent.setLanguages(body.languages);
        newStudent.setYearGroup(body.year_group);
        System.out.println("Roles: " + body.roles);
        Student savedStudent = studentRepository.save(newStudent);
        System.out.println("@AccountService, saved student with id: " + savedStudent.getId());
        if (body.roles.contains(RoleEnum.Tutor)) {
            System.out.println("@AccountService, adding tutor");
            Tutor newTutor = new Tutor();

            newTutor.setTutoringSubjects(body.subjects);
            newTutor.setStudent(savedStudent);
            newTutor.setProfileDescription(body.tutor_profile_description);

            savedStudent.setTutor(newTutor);
            System.out.println("@AccountService, added new tutor to student " + savedStudent.getId());
            
            tutorRepository.save(newTutor);
            System.out.println("@AccountService, saved tutor with id: " + newTutor.getId());

            List<TutorTimeSlot> timeSlots = new LinkedList<>();
            for (TimeSlotCreateBody timeSlotBody : body.time_availability) {
                
                for (TimeCreateBody timeBody : timeSlotBody.time) {
                    
                    TutorTimeSlot newTimeSlot = new TutorTimeSlot();
                    newTimeSlot.setWeekDay(timeSlotBody.day);

                    newTimeSlot.setStartTime(timeBody.start_time);
                    newTimeSlot.setEndTime(timeBody.end_time);
                    newTimeSlot.setTutor(newTutor);
                    
                    timeSlotRepository.save(newTimeSlot);

                    timeSlots.add(newTimeSlot);
                }                
            }

            newTutor.setFreeTimeSlots(timeSlots);
        }
        if (body.roles.contains(RoleEnum.Tutee)) {
            System.out.println("@AccountService, adding tutee");
            Tutee newTutee = new Tutee();

            newTutee.setStudent(savedStudent);

            savedStudent.setTutee(newTutee); 
            System.out.println("@AccountService, added tutee to student " + savedStudent.getId());
            
            tuteeRepository.save(newTutee);
            System.out.println("@AccountService, saved tutee with id: " + newTutee.getId());
        }

        studentRepository.save(savedStudent);
        return savedStudent;
    }

    public void deleteUserById(Long id) {
        accountRepository.deleteById(id);
    }

    public void deleteUser(User user) {
        accountRepository.delete(user);
    }

    public ResponseEntity<AccountLoginSuccessBody> handleStudentLogin(Student student) {
        
        AccountLoginSuccessBody responseBody = createStudentResponse(student);

        if (responseBody.role.contains(RoleEnum.Tutor)) {
            Tutor tutor = student.getTutor();
            responseBody.tutoring_subjects = tutor.getTutoringSubjects();
        }

        return ResponseEntity.ok(responseBody);
    }

    public ResponseEntity<AccountLoginSuccessBody> handleAdminLogin(Administrator admin) {

        AccountLoginSuccessBody responseBody = createAdminResponse(admin);
        return ResponseEntity.ok(responseBody);
        
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

    private AccountLoginSuccessBody createStudentResponse(Student student) {
        AccountLoginSuccessBody responseBody = new AccountLoginSuccessBody();
        System.out.println("Student: " + student);
        Tutor tutor = student.getTutor();
     
        responseBody.token = generateToken(student.getId().toString());
        responseBody.id = student.getId();
        responseBody.name = student.getFullName();
        responseBody.email = student.getEmail();
        responseBody.role = List.of(roleService.getRolesByUserId(student.getId()));
        if (tutor != null) {
            System.out.println("Tutorinhere: " + tutor);
            responseBody.tutoring_subjects = tutor.getTutoringSubjects();
        }
        responseBody.year_group = student.getYearGroup();
        responseBody.is_administrator = false;
        return responseBody;
    }

    private AccountLoginSuccessBody createAdminResponse(Administrator admin) {
        AccountLoginSuccessBody responseBody = new AccountLoginSuccessBody();
        responseBody.token = generateToken(admin.getId().toString());
        responseBody.id = admin.getId();
        responseBody.name = ((User) admin).getFullName();
        responseBody.email = ((User) admin).getEmail();
        responseBody.role = null;
        responseBody.tutoring_subjects = null;
        responseBody.year_group = null;
        responseBody.is_administrator = true;

        return responseBody;
    }

}
