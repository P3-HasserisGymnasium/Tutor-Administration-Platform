package project.backend.controller;

import java.util.List;

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
import project.backend.controller_bodies.account_controller.AccountLoginSuccessBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
import project.backend.model.Administrator;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.Tutor;
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

        // Check the type of user to return the appropriate response
        if (user instanceof Student) {
            
            AccountLoginSuccessBody responseBody = new AccountLoginSuccessBody();
            responseBody.token = "781263987163921632136123gd1267dg12768gdasgdasdasgdasuhdg2176dg";
            responseBody.id = user.getId();
            responseBody.name = user.getFullName();
            responseBody.email = user.getEmail();
            RoleEnum[] roles = roleService.getRolesByUserId(user.getId());
            responseBody.role = List.of(roles);
            responseBody.year_group = ((Student) user).getYearGroup();
            if (responseBody.role.contains(RoleEnum.Tutor)) {
                Tutor tutor = ((Student)user).getTutor();
                responseBody.tutoring_subjects = tutor.getTutoringSubjects();
                return ResponseEntity.ok(responseBody);
            }
            return ResponseEntity.ok(responseBody);
        } else if (user instanceof Administrator) {
            // Handle login for Administrator
            return ResponseEntity.ok("Administrator login successful");
        } else {
            // If the user is of an unknown type (shouldn't happen), handle accordingly
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user type");
        }
    } catch (UserNotFoundException | PasswordMismatchException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}

}
