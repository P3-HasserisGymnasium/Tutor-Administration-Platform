package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom queries for posts
    
}
