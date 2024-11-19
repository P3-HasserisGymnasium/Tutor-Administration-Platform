package project.backend.model;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Tutee extends Role {

    @OneToMany(mappedBy = "tutee")
    List<Post> posts = new LinkedList<>();

    public Tutee() {}

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
