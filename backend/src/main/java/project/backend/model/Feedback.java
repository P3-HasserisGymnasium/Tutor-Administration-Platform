package project.backend.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Feedback {
    @Column(name = "tutee")
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
    Date submissionDate;
    
    @Column(name = "subject")
    SubjectEnum relevantSubject;

    public Feedback() {}

    public Tutee getTutee() {
        return tutee;
    }

    public void setTutee(Tutee tutee) {
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

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public SubjectEnum getRelevantSubject() {
        return relevantSubject;
    }

    public void setRelevantSubject(SubjectEnum relevantSubject) {
        this.relevantSubject = relevantSubject;
    }
}
