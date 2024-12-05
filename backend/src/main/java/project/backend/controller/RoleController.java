package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import project.backend.service.RoleService;
import project.backend.model.RoleEnum;
import project.backend.model.User;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/role")
public class RoleController {
    
    final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/{id}/{role}")
    public User getProfile(@PathVariable long id, @PathVariable RoleEnum role) {
        return (User) roleService.getProfile(id, role);
    }
}
