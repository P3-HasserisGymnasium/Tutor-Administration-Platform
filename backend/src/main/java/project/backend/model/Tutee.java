package project.backend.model;

import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Tutee extends Role {

    @OneToMany(mappedBy = "tutee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Post> posts = new LinkedList<>();

    @OneToMany(mappedBy = "tutee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Collaboration> collaborations = new LinkedList<>();

    @OneToOne(mappedBy = "tutee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    Student student;

    @ElementCollection
    @CollectionTable(name = "subjects_receiving_help_in", joinColumns = @JoinColumn(name = "role_id"))
    @Column(name = "subjects_receiving_help_in")
    @Enumerated(EnumType.STRING)
    List<SubjectEnum> subjects;

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


    public List<SubjectEnum>  getSubjectsReceivingHelpIn(){
        List<Collaboration> collaborations = getCollaborations();
        subjects = collaborations.stream().map(collab -> collab.getSubject()).toList();
        return subjects;
    }

    public void setSubjectsReceivingHelpIn(List<SubjectEnum> subjects){
        this.subjects = subjects;
    }
}
