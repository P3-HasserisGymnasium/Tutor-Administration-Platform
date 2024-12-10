package project.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.role_controller.TuteeProfileResponse;
import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.RoleEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.service.RoleService;
import project.backend.utilities.HelperFunctions;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    final RoleService roleService;
    private final HelperFunctions helperFunctions;

    public RoleController(RoleService roleService, HelperFunctions helperFunctions) {
        this.roleService = roleService;
        this.helperFunctions = helperFunctions;
    }

    @GetMapping("/tutees")
    public ResponseEntity<?> getTutees(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to view all tutees");
        }

        List<Tutee> tutees = roleService.getTutees();

        return ResponseEntity.status(HttpStatus.OK).body(tutees);
    }

    @GetMapping("/tutors")
    public ResponseEntity<?> getTutors(HttpServletRequest request) {

        // Everyone is allowed yes?

        List<Tutor> tutors = roleService.getTutors();

        return ResponseEntity.status(HttpStatus.OK).body(tutors);
    }

    @GetMapping("/{id}/{role}")
    public ResponseEntity<?> getProfile(@PathVariable long id, @PathVariable RoleEnum role,
            HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!helperFunctions.isUserPermitted(authenticatedUser, id)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: You do not have access to this profile");
        }

        if (role == RoleEnum.Tutor) {
            try {
                TutorProfileResponse response = roleService.getTutorProfile(id);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tutor not found");
            }
        } else {
            try {
                TuteeProfileResponse response = roleService.getTuteeProfile(id);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tutee not found");
            }
        }
    }
}
