package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.controller_bodies.AccountRegisterBody;
import project.backend.controller_bodies.AccountLoginBody;
import project.backend.model.User;
import project.backend.service.AccountService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/account")
public class AccountController {

    final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return accountService.getUserById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public User createUser(@RequestBody AccountRegisterBody body) {

        boolean passwordsMatch = body.password.equals(body.confirmPassword);
        if (passwordsMatch == false) {
            throw new IllegalArgumentException("Passwords do not match (" + body.password + ") != (" + body.confirmPassword + ")");
        }

        return accountService.saveNewUser(body);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        accountService.deleteUserById(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody AccountLoginBody body) {
        return accountService.checkPassword(body.email, body.password).orElse(null);
    }
}