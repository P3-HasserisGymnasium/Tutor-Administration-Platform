package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Administrator;
import project.backend.service.AdministratorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/administrator")
public class AdministratorController {
    
    private final AdministratorService administratorService;
    
    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @GetMapping("/{id}")
    public Administrator getAdministrator(@PathVariable Long id) {
        return administratorService.getAdministratorById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public Administrator createAdministrator(@RequestBody Administrator administrator) {
        return administratorService.saveAdministrator(administrator);
    }

    @DeleteMapping("/{id}")
    public void deleteAdministrator(@PathVariable Long id) {
        administratorService.deleteAdministratorById(id);
    }
}