package project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.backend.model.Post;
import project.backend.model.SubjectEnum;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom queries for posts
    
    
    @Query("""
        SELECT p FROM Post p 
        WHERE 
            p.subject IN :subjects 
            AND (p.minDuration IS NULL OR p.minDuration >= :minDuration) 
            AND (p.maxDuration IS NULL OR p.maxDuration <= :maxDuration) 
            AND p.tutee.id != :tuteeId
    """)
    List<Post> findByFilters(
        @Param("subjects") List<SubjectEnum> subjects,
        @Param("minDuration") Integer minDuration,
        @Param("maxDuration") Integer maxDuration,
        @Param("tuteeId") Long tuteeId);
    
    @Query("SELECT p FROM Post p WHERE p.tutee.id = :tuteeId")
    public Post[] findByTutee_Id(@Param("tuteeId") Long tuteeId);
}
