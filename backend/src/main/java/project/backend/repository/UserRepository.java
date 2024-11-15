package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom queries for users
}
