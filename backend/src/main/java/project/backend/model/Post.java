package project.backend.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonBackReference
    Tutee tutee;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject")
    SubjectEnum subject;

    @Column(name = "title")
    String title;

    @Column(name = "description", length = 1000)
    String description;

    @Column(name = "min_Duration", nullable = true)
    Integer minDuration;

    @Column(name = "max_Duration", nullable = true)
    Integer maxDuration;

    @Column(name = "creation_date")
    Timestamp creationTimestamp;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    PostState state;

    public Post(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tutee getTutee() {
        return tutee;
    }

    public void setTutee(Tutee tutee) {
        this.tutee = tutee;
    }

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(Timestamp creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public PostState getState() {
        return state;
    }

    public void setState(PostState state) {
        this.state = state;
    }

    public void setDuration(List<Integer> duration) {
        if (duration == null) {
            this.minDuration = null;
            this.maxDuration = null;
        } else {
            this.minDuration = duration.get(0);
            this.maxDuration = duration.get(1);
        }
    }

    public List<Integer> getDuration() {
        if (this.minDuration == null && this.maxDuration == null) {
            return null;
        } else {
            return List.of(this.minDuration, this.maxDuration);
        } 
       
    }
}
