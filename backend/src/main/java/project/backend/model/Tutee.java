package project.backend.model;

import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Tutee extends Role {

    @OneToMany(mappedBy = "tutee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Post> posts = new LinkedList<>();

    @OneToMany(mappedBy = "tutee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    @JsonManagedReference
    List<Collaboration> collaborations = new LinkedList<>();

    @OneToOne(mappedBy = "tutee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    Student student;

    public Tutee() {
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Collaboration> getCollaborations() {
        return collaborations;
    }

    public void setCollaborations(List<Collaboration> collaborations) {
        this.collaborations = collaborations;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}
