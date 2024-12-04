package project.backend.service;

import java.util.Optional;
import java.sql.Timestamp;

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

    private final AccountRepository accountRepository;
    private final StudentRepository studentRepository;
    private final TutorRepository tutorRepository;
    private final TuteeRepository tuteeRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository, StudentRepository studentRepository, TutorRepository tutorRepository, TuteeRepository tuteeRepository) {
        this.accountRepository = accountRepository;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
        this.tuteeRepository = tuteeRepository;
    }

    public User getUserById(Long id){
        Optional<User> userOpt = accountRepository.findById(id);
        return userOpt.orElseThrow(() -> new IllegalArgumentException("User with id " + id + " not found"));
    }

    public User saveUser(User user) {
        return accountRepository.save(user);
    }

    public void deleteUserById(Long id) {
        accountRepository.deleteById(id);
    }

    public User registerAccount(User user){
        String email = user.getEmail();     

        if(accountRepository.findByEmail(email).isPresent()){
            throw new IllegalArgumentException("Email is already registered");
        }

        Student student = (Student) user;
        student.setRegistrationTimestamp(new Timestamp(System.currentTimeMillis()));
        return accountRepository.save(student);
    }

    public void removeAccount(Long id) {
        User user = getUserById(id);  
        deleteUserById(id);  
    }

    
    public Optional<User> checkPassword(String email, String password) {
        Optional<User> userOpt = accountRepository.findByEmail(email);
        if (userOpt.isPresent() && PasswordUtility.matches(password, userOpt.get().getPasswordHash())) {
            return userOpt;
        }
        return Optional.empty();
    }

}
