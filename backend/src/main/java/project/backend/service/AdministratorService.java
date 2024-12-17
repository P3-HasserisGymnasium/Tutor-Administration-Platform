package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Administrator;
import project.backend.repository.AdministratorRepository;

@Service
public class AdministratorService {
    
    @Autowired
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

    public Optional<Administrator> findFirstBy() {
        return administratorRepository.findFirstBy();
    }
}