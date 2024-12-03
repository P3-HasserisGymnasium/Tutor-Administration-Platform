package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.User;
import project.backend.repository.AccountRepository;
import project.backend.util.PasswordUtility;

@Service
public class AccountService {
    
    @Autowired
    final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
        this.passwordUtility = passwordUtility;
    }

    public Optional<User> getUserById(Long id){
        return accountRepository.findById(id);
    }

    public User saveUser(User user) {
        return accountRepository.save(user);
    }

    public void deleteUserById(Long id) {
        accountRepository.deleteById(id);
    }

    public User checkPassword(String email, String password) {
        User user = accountRepository.findByEmail(email);
        if (user != null && passwordUtility.matches(password, user.getPasswordHash())) {
            return true;
        }
        return false;
    }

}
