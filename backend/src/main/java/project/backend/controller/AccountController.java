package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.User;
import project.backend.service.AccountService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class AccountController {

    final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
<<<<<<< HEAD:backend/src/main/java/project/backend/controller/StudentController.java
    public Student getStudent(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .orElse(null);
=======
    public User getUser(@PathVariable Long id) {
        return accountService.getUserById(id)
            .orElse(null);
>>>>>>> refs/remotes/origin/main:backend/src/main/java/project/backend/controller/AccountController.java
    }

    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return accountService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        accountService.deleteUserById(id);
    }
}
