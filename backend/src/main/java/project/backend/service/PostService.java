package project.backend.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.model.Post;
import project.backend.model.PostState;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
import project.backend.repository.PostRepository;

@Service
public class PostService {
    
    @Autowired
    final PostRepository postRepository;

    @Autowired
    final RoleService roleService; 
  
    @Autowired
    final TuteeService tuteeService;

    public PostService(PostRepository postRepository, RoleService roleService, TuteeService tuteeService) {
        this.postRepository = postRepository;
        this.roleService = roleService;
        this.tuteeService = tuteeService;
    }

    public List<Post> getPostsByFilters(Integer minDuration, Integer maxDuration, List<SubjectEnum> subjects, Long tuteeId){
        return postRepository.findByFilters(subjects, minDuration, maxDuration, tuteeId);
    }

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }

    public Post[] getPostsByTuteeId(Long tuteeId){
        return postRepository.findByTutee_Id(tuteeId);
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public Post[] getPairingRequests() {
        return postRepository.findPairingRequests();
    }

    public void deletePostById(Long postId) {
        postRepository.deleteById(postId);
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
/*
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
*/
    public Post createPost(PostBody postBody, Long tuteeId){
        Tutee tutee = roleService.getTuteeById(tuteeId);

        Post post = new Post();
        post.setTutee(tutee);
        post.setSubject(postBody.subject);
        post.setTitle(postBody.title);
        post.setDescription(postBody.description);
        post.setDuration(postBody.duration);
        post.setPairingRequest(postBody.getIsPairingRequest());
        post.setState(PostState.VISIBLE);    


        Optional<Tutee> tuteeOpt = tuteeService.getTuteeById(tuteeId);
        
        if(!tuteeOpt.isPresent()){
            throw new IllegalArgumentException("Tutee not found with ID: " + tuteeId);
        }

        tutee = tuteeOpt.get();

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


