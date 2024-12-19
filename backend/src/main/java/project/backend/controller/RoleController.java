package project.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.role_controller.AddSubjectBody;
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

    @GetMapping("/tutees")
    public ResponseEntity<?> getTutees(HttpServletRequest request) throws JsonProcessingException {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to view all tutees");
        }

        List<TuteeProfileResponse> tutees = roleService.getTutees();
        return ResponseEntity.status(HttpStatus.OK).body(tutees);
    }

    @GetMapping("/tutors")
    public ResponseEntity<?> getTutors(HttpServletRequest request) {

        // Everyone is allowed yes?

        List<TutorProfileResponse> tutors = roleService.getTutors();

        return ResponseEntity.status(HttpStatus.OK).body(tutors);
    }

    @GetMapping("/{id}/{role}")
    public ResponseEntity<?> getProfile(@PathVariable long id, @PathVariable RoleEnum role,
            HttpServletRequest request) {

        if (role == RoleEnum.Tutor) {
            try {
                TutorProfileResponse response = roleService.getTutorProfile(id);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.OK).body("error: " + e.getMessage());
            }
        } else {
            try {
                TuteeProfileResponse response = roleService.getTuteeProfile(id);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.OK).body("error: " + e.getMessage());
            }
        }
    }

    @PutMapping("/edit/{id}/{role}")
    public ResponseEntity<?> editProfile(@PathVariable long id, @PathVariable RoleEnum role,
            @RequestBody TutorProfileResponse body, HttpServletRequest request) {
        // AuthenticatedUserBody authenticatedUser =
        // AuthUser.getAuthenticatedUser(request);

        if (role == RoleEnum.Tutor) {
            try {
                roleService.editTutorProfile(id, body);
                return ResponseEntity.status(HttpStatus.OK).body("Tutor profile edited successfully");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("error:" + e.getMessage());
            }
        } else {
            try {
                // roleService.editTuteeProfile(id, body);
                return ResponseEntity.status(HttpStatus.OK).body("Tutee profile edited successfully");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
            }
        }
    }

    @PostMapping("/tutorsFiltered")
    public ResponseEntity<?> getTutorProfilesFiltered(@RequestBody TutorFilterBody body, HttpServletRequest request) {
        try {
            AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
            ArrayList<TutorProfileResponse> response = roleService.getTutorProfilesFiltered(body.subjects,
                    body.time_availability, body.year_group, body.languages, authenticatedUser.getTutorId());
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("error: " + e.getMessage());
        }
    }

    @PostMapping("/tutor/addSubject")
    public ResponseEntity<?> addSubjectToTutor(@RequestBody AddSubjectBody body, HttpServletRequest request) {

        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You do not have permission to add subjects to tutors");
        }

        try {
            roleService.addSubjectToTutor(body);
            return ResponseEntity.ok().body("Subject added to tutor");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("error: " + e.getMessage());
        }
    }

    @PostMapping("/tutor/removeSubject")
    public ResponseEntity<?> removeSubjectFromTutor(@RequestBody AddSubjectBody body, HttpServletRequest request) {

        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You do not have permission to remove subjects from tutors");
        }

        try {
            roleService.removeSubjectFromTutor(body);
            return ResponseEntity.ok().body("Subject removed from tutor");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("error: " + e.getMessage());
        }
    }
}
