package project.backend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.post_controller.PairingRequestBody;
import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.model.Post;
import project.backend.model.PostState;
import project.backend.model.SubjectEnum;
import project.backend.service.PostService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/post")
public class PostController {

    final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("")
    public ResponseEntity<?> getPosts(HttpServletRequest request,  
        @RequestParam(required = false) String subjects,
        @RequestParam(required = false) String duration) {

        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to view these posts");
        }
        if(subjects != null && !subjects.isEmpty() && duration != null && !duration.isEmpty()){
            // Parse subjects
            List<SubjectEnum> subjectList = null;
            subjectList = Arrays.stream(subjects.split(","))
                            .map(SubjectEnum::valueOf) // Convert to SubjectEnum
                            .collect(Collectors.toList());
        
            // Parse durtion
            Integer minDuration = null, maxDuration = null;
            String[] durationParts = duration.split(",");
            if (durationParts.length == 2) {
                try {
                    minDuration = Integer.parseInt(durationParts[0]);
                    maxDuration = Integer.parseInt(durationParts[1]);
                } catch (NumberFormatException e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid duration format");
                }
            }

            Long fakeTuteeId = 0L;
            List<Post> posts = postService.getPostsByFilters(minDuration, maxDuration, subjectList, authenticatedUser.getTuteeId() != null ? authenticatedUser.getTuteeId() : fakeTuteeId);
            return ResponseEntity.status(HttpStatus.OK).body(posts);
        }                       

        List<Post> posts = postService.getAllPosts();

        if (posts == null) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Post post = postService.getPostById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        if (authenticatedUser.getTutorId() == null && authenticatedUser.getTuteeId() != post.getTutee().getId() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this post");
        }

        return ResponseEntity.status(HttpStatus.OK).body(post);
    }

    

    @GetMapping("/tutee")
    public ResponseEntity<?> getOwnPosts(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (authenticatedUser.getTuteeId() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view your posts");
        }

        Post[] posts = postService.getPostsByTuteeId(authenticatedUser.getTuteeId());
        if (posts == null) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

    @GetMapping("/pairing_requests")
    public ResponseEntity<?> getPairingRequests(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You do not have access to this resource");
        }

        Post[] posts = postService.getPairingRequests();
        
        ArrayList<PairingRequestBody> pairingRequests = new ArrayList<>();

        for (Post post : posts) {
            PairingRequestBody pairingRequestBody = new PairingRequestBody();
            pairingRequestBody.setId(post.getId());
            pairingRequestBody.setTutee_id(post.getTutee().getId());
            pairingRequestBody.setTutee_name(post.getTutee().getStudent().getFullName());
            pairingRequestBody.setSubject(post.getSubject());
            pairingRequestBody.setTitle(post.getTitle());
            pairingRequestBody.setDescription(post.getDescription());
            pairingRequestBody.setDuration(post.getDuration());
            pairingRequestBody.setPairingRequest(post.getPairingRequest());
            pairingRequestBody.setState(post.getState());
            pairingRequests.add(pairingRequestBody);
        }

        if (posts == null) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }
        return ResponseEntity.status(HttpStatus.OK).body(pairingRequests);
    }

  

    @PostMapping("/")
    public ResponseEntity<?> createPost(@RequestBody PostBody postBody, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutee() && !authenticatedUser.isAdministrator()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to create a post");
        }

        postService.createPost(postBody, authenticatedUser.getTuteeId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Post created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (authenticatedUser.getTuteeId() != postService.getPostById(id).get().getTutee().getId() || !authenticatedUser.isAdministrator()) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You do not have permission to delete this post");
        }

        postService.deletePostById(id);

        return ResponseEntity.status(HttpStatus.OK).body("Post deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editPost(@PathVariable Long id, @RequestBody PostBody postBody, HttpServletRequest request) {
        
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!Objects.equals(authenticatedUser.getTuteeId(), postService.getPostById(id).get().getTutee().getId()) && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You do not have permission to update this post");
        }
        Post post = postService.getPostById(id).get();
        post.setSubject(postBody.subject);
        post.setTitle(postBody.title);
        post.setDescription(postBody.description);
        post.setDuration(postBody.duration);
        post.setState(PostState.VISIBLE);


        postService.editPost(id, post);

        return ResponseEntity.status(HttpStatus.OK).body(post);
    }
}
