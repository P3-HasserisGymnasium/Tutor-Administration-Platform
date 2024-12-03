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

@Service
public class PostService {
    
    @Autowired
    final PostRepository postRepository;

    @Autowired
    final RoleService roleService; 

    public PostService(PostRepository postRepository, RoleService roleService) {
        this.postRepository = postRepository;
        this.roleService = roleService;
    }

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }

    public Post savePost(Post post) {
        post.setState(PostState.ACTIVE);
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
}


