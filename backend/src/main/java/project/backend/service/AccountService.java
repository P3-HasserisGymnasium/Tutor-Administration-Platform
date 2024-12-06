package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.List;
import static project.backend.utilities.JWTUtil.generateToken;

import project.backend.controller_bodies.account_controller.AccountLoginBody;
import project.backend.controller_bodies.account_controller.AccountLoginSuccessBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
import project.backend.model.Administrator;
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

    @Autowired
    final RoleService roleService;

    public AccountService(AccountRepository accountRepository, StudentRepository studentRepository, TutorRepository tutorRepository, TuteeRepository tuteeRepository, RoleService roleService) {
        this.accountRepository = accountRepository;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
        this.tuteeRepository = tuteeRepository;
        this.roleService = roleService;
    }

    public boolean emailExists(String email) {
        return accountRepository.findByEmail(email) != null;
    }

    public Optional<User> getUserById(Long id) {
        return accountRepository.findById(id);
    }

    public User saveNewUser(AccountRegisterBody body) {

        if (emailExists(body.email)) throw new EmailAlreadyExistsException("Email Already Exists");
        if (!body.password.equals(body.confirmPassword)) throw new PasswordMismatchException("Passwords do not match");


        Student newStudent = new Student();
        String passwordHash = PasswordUtility.encodePassword(body.password);
        newStudent.setFullName(body.fullName);
        newStudent.setEmail(body.email);
        newStudent.setPasswordHash(passwordHash);
        newStudent.setLanguages(body.languages);
        newStudent.setYearGroup(body.yearGroup);
        
        Student savedStudent = studentRepository.save(newStudent);

        if (body.roles.contains(RoleEnum.Tutor)) {
            Tutor newTutor = new Tutor();

            newTutor.setTutoringSubjects(body.tutorSubjects);
            newTutor.setStudent(savedStudent);

            savedStudent.setTutor(newTutor);
            tutorRepository.save(newTutor);
        }
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
        responseBody.token = generateToken(student.getId().toString());
        responseBody.id = student.getId();
        responseBody.name = student.getFullName();
        responseBody.email = student.getEmail();
        responseBody.role = List.of(roleService.getRolesByUserId(student.getId()));
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
