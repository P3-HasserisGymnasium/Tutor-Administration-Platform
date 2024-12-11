package project.backend.controller;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

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
import project.backend.model.PostState;
import project.backend.model.Student;
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

    @GetMapping("")
    public ResponseEntity<?> getPosts(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isTutor() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to view these posts");
        }

        List<Post> posts = postService.getAllPosts();

        System.out.println("posts" + posts);
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

        if (authenticatedUser.getTutorId() == null || authenticatedUser.getTuteeId() != post.getTutee().getId() || !authenticatedUser.isAdministrator()) {
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
        System.out.println("tuteeId" + authenticatedUser.getTuteeId());

        Post[] posts = postService.getPostsByTuteeId(authenticatedUser.getTuteeId());

        System.out.println("posts" + posts);
        if (posts == null) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

  

    @PostMapping("/")
    public ResponseEntity<?> createPost(@RequestBody PostBody postBody, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        Student student = roleService.getStudentById(authenticatedUser.getUserId());
        Tutee tutee = student.getTutee();

        System.out.println("firstprint" + authenticatedUser.getTuteeId());
        System.out.println("secondprint" + tutee.getId());
        System.out.println("thirdprint" + authenticatedUser.isAdministrator());

        if (authenticatedUser.getTuteeId() != tutee.getId() && !authenticatedUser.isAdministrator()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You must be logged in to create a post");
        }

        Post post = new Post();
        post.setTutee(tutee);
        post.setSubject(postBody.subject);
        post.setTitle(postBody.title);
        post.setDescription(postBody.description);
        post.setDuration(postBody.duration);
        post.setState(PostState.VISIBLE);    
        System.out.println("post1" + post);

        postService.createPost(post, tutee.getId());
        System.out.println("post2" + post);
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
        System.out.println("before authuser");
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        System.out.println("after authuser");

        if (!Objects.equals(authenticatedUser.getTuteeId(), postService.getPostById(id).get().getTutee().getId()) && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: You do not have permission to update this post");
        }
        Post post = postService.getPostById(id).get();
        post.setSubject(postBody.subject);
        post.setTitle(postBody.title);
        post.setDescription(postBody.description);
        post.setDuration(postBody.duration);
        post.setState(PostState.VISIBLE);

        System.out.println("PostController subject" + postBody.subject);
        System.out.println("PostController title" + postBody.title);
        System.out.println("PostController description" + postBody.description);
        System.out.println("PostController duration" + postBody.duration);

        postService.editPost(id, post);

        return ResponseEntity.status(HttpStatus.OK).body(post);
    }
}
