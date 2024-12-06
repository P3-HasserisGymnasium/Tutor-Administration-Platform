package project.backend.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    private Student student; 

    @Column(name = "subject")
    @ElementCollection(targetClass = Language.class)
    @CollectionTable(name = "tutor_subjects", joinColumns = @JoinColumn(name = "tutor_application_id"))
    @Enumerated(EnumType.STRING)
    List<SubjectEnum> subjects;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    TutorApplicationState state;

    @Column(name = "application_text")
    String description;

    @Column(name = "rejection_reason")
    String rejectionReason;



    public TutorApplication() {}

    public Long getId() {
        return id;
    }

    public Student getStudent(){
        return student;
    }

    public void setStudent(Student student){
        this.student = student;
    }

    public List<SubjectEnum> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectEnum> subjects) {
        this.subjects = subjects;
    }

    public TutorApplicationState getState(){
        return state;
    }

    public void setState(TutorApplicationState state){
        this.state = state;
    }
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    
}
