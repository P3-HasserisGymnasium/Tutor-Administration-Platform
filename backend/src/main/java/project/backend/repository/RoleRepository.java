package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    // Custom queries can be added here


}
