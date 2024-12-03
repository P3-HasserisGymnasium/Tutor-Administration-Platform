package project.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    private Student student; 

    @Enumerated(EnumType.STRING)
    @Column(name = "subject")
    SubjectEnum subject;

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

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
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
