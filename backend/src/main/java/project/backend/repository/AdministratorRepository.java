package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Administrator;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    // Custom queries for administratorss
    
}
