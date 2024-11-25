package project.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Enumerated(EnumType.STRING)
    @Column(name = "subject")
    SubjectEnum subject;

    @Column(name = "application_text")
    String description;

    @Column(name = "rejection_reason")
    String rejectionReason;

    public TutorApplication() {}

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
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
