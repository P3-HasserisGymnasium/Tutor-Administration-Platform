package project.backend.model;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Tutee extends Role {

    @OneToMany(mappedBy = "tutee")
    List<Post> posts = new LinkedList<>();

    @OneToMany(mappedBy = "tutee")
    List<Collaboration> collaborations = new LinkedList<>();

    @OneToOne
    @JoinColumn(name = "student_id")
    Student student;

    public Tutee() {}

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
