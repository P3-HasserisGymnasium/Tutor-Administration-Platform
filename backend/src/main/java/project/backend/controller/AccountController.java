package project.backend.controller;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.controller_bodies.account_controller.AccountLoginBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
import project.backend.model.Administrator;
import project.backend.model.Student;
import project.backend.model.User;
import project.backend.service.AccountService;
import project.backend.service.RoleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/account")
public class AccountController {

    final AccountService accountService;
    final RoleService roleService;
    public AccountController(AccountService accountService, RoleService roleService) {
        this.accountService = accountService;
        this.roleService = roleService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return accountService.getUserById(id).orElse(null);
    }

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody AccountRegisterBody body) {
        
        try {
            User savedUser = accountService.saveNewUser(body);
            return ResponseEntity.ok(savedUser);
        }
        catch (EmailAlreadyExistsException | PasswordMismatchException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        accountService.deleteUserById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountLoginBody body) {
        try {

            User user = accountService.getUserIfCorrectPassword(body);

            if (user instanceof Student) {
                return accountService.handleStudentLogin((Student) user);
            }

            if (user instanceof Administrator) {
                return accountService.handleAdminLogin((Administrator) user);
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user type");

        } catch (UserNotFoundException | PasswordMismatchException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
