package project.backend.service;

import java.util.Optional;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Post;
import project.backend.model.PostState;
import project.backend.model.Tutee;
import project.backend.model.Student;

import project.backend.repository.PostRepository;
import project.backend.repository.TuteeRepository;

@Service
public class PostService {
    
    @Autowired
    final PostRepository postRepository;

    @Autowired
    final RoleService roleService; 
  
    @Autowired
    final TuteeRepository tuteeRepository;
  

    public PostService(PostRepository postRepository, RoleService roleService, TuteeRepository tuteeRepository) {
        this.postRepository = postRepository;
        this.roleService = roleService;
        this.tutteRepository = tuteeRepository;
    }

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }

    public Post savePost(Post post) {
        post.setState(PostState.VISIBLE);
        return postRepository.save(post);
    }

    public void deletePostById(Long postId) {
        postRepository.deleteById(postId);
    }

    public Post createPost(Post post, Long id){
        
        Student student = roleService.getStudentById(id);

        Tutee tutee = student.getTutee();

        post.setTutee(tutee);
        post.setCreationTimestamp(new Timestamp(System.currentTimeMillis()));

        return savePost(post);
    }

    public Post editPost(Long postId, Post editedPost){
        Optional<Post> existingPostOpt = postRepository.findById(postId);

        if(!existingPostOpt.isPresent()){
            throw new IllegalArgumentException("This Post is not found with ID:" + postId);
        }

        Post existingPost = existingPostOpt.get();

        // Update fields of exisiting post
        existingPost.setTitle(editedPost.getTitle());
        existingPost.setDescription(editedPost.getDescription());
        existingPost.setDuration(editedPost.getDuration());
        existingPost.setSubject(editedPost.getSubject());

        return savePost(existingPost);        
    }

    public Post createPost(Post post, Long tuteeId){
        
        Optional<Tutee> tuteeOpt = tuteeRepository.findById(tuteeId);

        if(!tuteeOpt.isPresent()){
        throw new IllegalArgumentException("Tutee not found with ID: " + tuteeId);
        }

        Tutee tutee = tuteeOpt.get();

        post.setTutee(tutee);
        post.setCreationTimestamp(new Timestamp(System.currentTimeMillis()));

        return savePost(post);
    }

    public Post editPost(Long postId, Post editedPost){
        Optional<Post> existingPostOpt = postRepository.findById(postId);

        if(!existingPostOpt.isPresent()){
            throw new IllegalArgumentException("This Post is not found with ID:" + postId);
        }

        Post existingPost = existingPostOpt.get();

        // Update fields of exisiting post
        existingPost.setTitle(editedPost.getTitle());
        existingPost.setDescription(editedPost.getDescription());
        existingPost.setDuration(editedPost.getDuration());
        existingPost.setSubject(editedPost.getSubject());

        return savePost(existingPost);        
    }

    


}


