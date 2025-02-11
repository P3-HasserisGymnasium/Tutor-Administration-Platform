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

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.account_controller.AccountLoginBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
import project.backend.model.Administrator;
import project.backend.model.Student;
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
    public ResponseEntity<?> getUser(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (authenticatedUser.getUserId().equals(id) == false && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this user");
        }

        try {
            User user = accountService.getUserById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody AccountRegisterBody body) {        
        try {
            User savedUser = accountService.saveNewStudent(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
        catch (EmailAlreadyExistsException | PasswordMismatchException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (authenticatedUser.getUserId().equals(id) == false && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to delete this user");
        }

        try {
                accountService.deleteUserById(id);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountLoginBody body) {
        try {

            User user = accountService.getUserIfCorrectPassword(body);

            if (user instanceof Administrator admin) {
                return accountService.handleAdminLogin(admin);
            }

            if (user instanceof Student student) {
                return accountService.handleStudentLogin(student);
            }

          

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user type");

        } catch (UserNotFoundException | PasswordMismatchException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
