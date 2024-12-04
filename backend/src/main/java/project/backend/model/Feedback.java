package project.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    Tutee tutee;

    @ManyToOne
    Tutor tutor;

    @Column(name = "communication_capabilities")
    String communicationRemarks;

    @Column(name = "knowledge_capabilities")
    String knowledgeRemarks;

    @Column(name = "other_remarks")
    String otherRemarks;

    @Column(name = "submission_date")
    Timestamp submissionTimestamp;
    
    @Column(name = "subject")
    SubjectEnum subject;

    public Feedback() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tutee getTuteeId() {
        return tutee;
    }

    public void setTuteeId(Tutee tutee) {
        this.tutee = tutee;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public String getCommunicationRemarks() {
        return communicationRemarks;
    }

    public void setCommunicationRemarks(String communicationRemarks) {
        this.communicationRemarks = communicationRemarks;
    }

    public String getKnowledgeRemarks() {
        return knowledgeRemarks;
    }

    public void setKnowledgeRemarks(String knowledgeRemarks) {
        this.knowledgeRemarks = knowledgeRemarks;
    }

    public String getOtherRemarks() {
        return otherRemarks;
    }

    public void setOtherRemarks(String otherRemarks) {
        this.otherRemarks = otherRemarks;
    }

    public Timestamp getSubmissionTimestamp() {
        return submissionTimestamp;
    }

    public void setSubmissionDate(Timestamp submissionTimestamp) {
        this.submissionTimestamp = submissionTimestamp;
    }

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
    }
}
