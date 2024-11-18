package project.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class TutoringSubjectRequest {

    @Column(name = "subject")
    SubjectEnum subject;

    @Column(name = "application_text")
    String description;

    @Column(name = "rejection_reason")
    String rejectionReason;

    public TutoringSubjectRequest() {}

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
