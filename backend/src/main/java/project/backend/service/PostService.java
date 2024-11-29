package project.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import project.backend.model.Post;
import project.backend.repository.PostRepository;

@Service
public class PostService {
    
    final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePostById(Long id) {
        postRepository.deleteById(id);
    }
}
