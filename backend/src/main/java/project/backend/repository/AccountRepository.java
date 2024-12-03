package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.User;

public interface AccountRepository extends JpaRepository<User, Long> {
    // Custom queries for users

    User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);
    
}
