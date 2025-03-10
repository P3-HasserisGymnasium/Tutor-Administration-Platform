package project.backend.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import project.backend.controller_bodies.AuthenticatedUserBody;

@Entity
public class Collaboration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "tutee_id")
    Tutee tutee;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "tutor_id")
    Tutor tutor;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    CollaborationState state;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject")
    SubjectEnum subject;

    @Column(name = "start_date", nullable = true)
    Timestamp startTimestamp;

    @Column(name = "end_date", nullable = true)
    Timestamp endTimestamp;

    @Column(name = "termination_reason", nullable = true)
    String terminationReason;

    @Column(name = "admin_accepted")
    Boolean adminState;

    @OneToMany(mappedBy = "collaboration", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    List<Meeting> meetings = new ArrayList<>();

    public Collaboration() {
    }

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

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public CollaborationState getState() {
        return state;
    }

    public void setState(CollaborationState state) {
        this.state = state;
    }

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
    }

    public Timestamp getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(Timestamp date) {
        this.startTimestamp = date;
    }

    public Timestamp getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(Timestamp date) {
        this.endTimestamp = date;
    }

    public String getTerminationReason() {
        return terminationReason;
    }

    public void setTerminationReason(String reason) {
        this.terminationReason = reason;
    }

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }

    public Boolean getAdminAccepted() {
        return adminState;
    }

    public void setAdminAccepted(Boolean adminState) {
        this.adminState = adminState;
    }

    public boolean isPartOfCollaboration(AuthenticatedUserBody user) {
        boolean isPartOfCollaborationAsTutee = user.isTutee() && tutee.getId().equals(user.getTuteeId());
        boolean isPartOfCollaborationAsTutor = user.isTutor() && tutor.getId().equals(user.getTutorId());
        
        return isPartOfCollaborationAsTutee || isPartOfCollaborationAsTutor;
    }
}

