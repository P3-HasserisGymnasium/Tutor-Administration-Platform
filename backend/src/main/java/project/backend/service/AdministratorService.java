package project.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import project.backend.model.Administrator;
import project.backend.repository.AdministratorRepository;

@Service
public class AdministratorService {
    
    final AdministratorRepository administratorRepository;

    public AdministratorService(AdministratorRepository administratorRepository) {
        this.administratorRepository = administratorRepository;
    }

    public Optional<Administrator> getAdministratorById(Long id){
        return administratorRepository.findById(id);
    }
    
    public Administrator saveAdministrator(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    public void deleteAdministratorById(Long id) {
        administratorRepository.deleteById(id);
    }
}