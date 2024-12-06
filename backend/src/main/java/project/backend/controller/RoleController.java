package project.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.RoleEnum;
import project.backend.model.User;
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

    @Deprecated
    @GetMapping("/{id}/{role}")
    public User getProfile(@PathVariable long id, @PathVariable RoleEnum role) {
        return (User) roleService.getProfile(id, role);
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<?> getTutorProfile(@PathVariable long id) {
        try {
            TutorProfileResponse response = roleService.getTutorProfile(id);
            return ResponseEntity.ok(response);
        } 
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
