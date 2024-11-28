package project.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.User;
import project.backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @PostMapping("/")
    public User createUser(User user) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }
}