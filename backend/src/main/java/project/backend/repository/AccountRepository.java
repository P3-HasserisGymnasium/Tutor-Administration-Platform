package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.User;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<User, Long> {
    // Custom queries for users

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);
    
}
