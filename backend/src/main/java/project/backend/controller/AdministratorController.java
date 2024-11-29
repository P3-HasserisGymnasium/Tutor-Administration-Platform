package project.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Administrator;
import project.backend.service.AdministratorService;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {
    
    private final AdministratorService administratorService;
    
    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @GetMapping("/{id}")
    public Administrator getAdministrator(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @PostMapping("/")
    public Administrator createAdministrator(@RequestBody Administrator administrator) {
        throw new UnsupportedOperationException("Method not implemented");
    }

    @DeleteMapping("/{id}")
    public void deleteAdministrator(@PathVariable Long id) {
        throw new UnsupportedOperationException("Method not implemented");
    }
}