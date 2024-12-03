package project.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    MeetingEnum meetingState;

    @Column(name = "start")
    Timestamp startTimestamp;

    @Column(name = "end")
    Timestamp endTimestamp;

    @Column(name = "rejectionReason")
    String rejectionReason;

    @Column(name = "meetingDescription")
    String meetingDescription;

    @ManyToOne
    Collaboration collaboration;

    public Meeting() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Collaboration getCollaboration() {
        return collaboration;
    }

    public void setCollaborationId(Collaboration collaboration) {
        this.collaboration = collaboration;
    }

    public MeetingEnum getMeetingState() {
        return meetingState;
    }

    public void setMeetingState(MeetingEnum meetingState) {
        this.meetingState = meetingState;
    }

    public Timestamp getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(Timestamp startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public Timestamp getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(Timestamp endTimestamp) {
        this.endTimestamp = endTimestamp;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getMeetingDescription() {
        return meetingDescription;
    }

    public void setMeetingDescription(String meetingDescription) {
        this.meetingDescription = meetingDescription;
    }

    public void postPoneMeeting(Timestamp newStart, Timestamp newEnd) {
        this.startTimestamp = newStart;
        this.endTimestamp = newEnd;
    }

}
