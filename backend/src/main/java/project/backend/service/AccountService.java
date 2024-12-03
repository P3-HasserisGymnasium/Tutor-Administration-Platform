package project.backend.service;

import java.util.Optional;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.User;
import project.backend.model.Student;
import project.backend.repository.AccountRepository;
import project.backend.utilities.PasswordUtility;

@Service
public class AccountService {
    
    @Autowired
    final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
        this.passwordUtility = passwordUtility;
    }

    public User getUserById(Long id){
        Optional <User> userOpt = accountRepository.findById(id);
        return userOpt.orElseThrow(() -> new IllegalArgumentException("User with id" + id + "not found"));
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

        return saveUser(user);
    }   


    public void removeAccount(Long id) {
        User user = getUserById(id);  
        deleteUserById(id);  

    public User checkPassword(String email, String password) {
        User user = accountRepository.findByEmail(email);
        if (user != null && passwordUtility.matches(password, user.getPasswordHash())) {
            return true;
        }
        return false;
    }

}
