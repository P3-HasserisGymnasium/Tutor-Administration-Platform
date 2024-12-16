package project.backend.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Post;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
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
        this.tuteeRepository = tuteeRepository;
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
    public Post createPost(Post post, Long tuteeId){
        
        Optional<Tutee> tuteeOpt = tuteeRepository.findById(tuteeId);
        System.out.println("tuteeId" + tuteeId);
        System.out.println("tuteeOpt" + tuteeOpt);
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


