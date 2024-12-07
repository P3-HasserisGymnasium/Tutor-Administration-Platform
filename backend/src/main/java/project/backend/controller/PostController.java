package project.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.model.Post;
import project.backend.model.Tutee;
import project.backend.service.PostService;
import project.backend.service.RoleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/post")
public class PostController {

    final PostService postService;
    final RoleService roleService;

    public PostController(PostService postService, RoleService roleService) {
        this.postService = postService;
        this.roleService = roleService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Post post = postService.getPostById(id).orElse(null);

        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        if (authenticatedUser.getTutorId() == null || authenticatedUser.getTuteeId() != post.getTutee().getId() || !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to view this post");
        }

        return ResponseEntity.status(HttpStatus.OK).body(post);
    }

    @PostMapping("/")
    public ResponseEntity<?> createPost(@RequestBody PostBody postBody, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (authenticatedUser.getTuteeId() != postBody.userId || !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to create a post");
        }
        Tutee tutee = roleService.getTuteeById(postBody.userId);
        Post post = new Post();
        post.setTutee(tutee);
        post.setSubject(postBody.subject);
        post.setTitle(postBody.title);
        post.setDescription(postBody.description);
        post.setDuration(postBody.duration);
        post.setState(postBody.state);    

        postService.createPost(post, postBody.userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(post);



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

        if (authenticatedUser.getTuteeId() != postService.getPostById(id).get().getTutee().getId() || !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You do not have permission to update this post");
        }

        Post post = postService.getPostById(id).get();
        post.setSubject(postBody.subject);
        post.setTitle(postBody.title);
        post.setDescription(postBody.description);
        post.setDuration(postBody.duration);
        post.setState(postBody.state);

        postService.editPost(id, post);

        return ResponseEntity.status(HttpStatus.OK).body(post);
    }
}
