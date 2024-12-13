package project.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.role_controller.TuteeProfileResponse;
import project.backend.controller_bodies.role_controller.TutorFilterBody;
import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.RoleEnum;
import project.backend.service.RoleService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/role")
public class RoleController {
    
    @Autowired
    final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/{id}/{role}")
    public ResponseEntity<?> getProfile(@PathVariable long id, @PathVariable RoleEnum role, HttpServletRequest request) {
        //AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
            }
        }
    }
 
    @PostMapping("/tutorsFiltered")
    public ResponseEntity<?> getTutorProfilesFiltered(@RequestBody TutorFilterBody body, HttpServletRequest request) {
        try {
            ArrayList<TutorProfileResponse> response = roleService.getTutorProfilesFiltered(body.subjects, body.time_availability, body.year_group, body.languages);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("error: " + e.getMessage());
        }
    }
}
