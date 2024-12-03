package project.backend.service;

import java.util.Optional;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.User;
import project.backend.model.Student;
import project.backend.repository.AccountRepository;

@Service
public class AccountService {
    
    @Autowired
    final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
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

    public void registerAccount(Student student){

        String email = student.getEmail();     

        if(accountRepository.findByEmail(email).isPresent()){
            throw new IllegalArgumentException("Email is already registered");
        }

        student.setRegistrationTimestamp(new Timestamp(System.currentTimeMillis()));

        saveUser(student);
    }   

    public void removeAccount(Long id){
        User user = getUserById(id);
        deleteUserById(id);
    }
}
