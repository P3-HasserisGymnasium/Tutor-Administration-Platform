package project.backend.model;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Collaboration {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @ManyToOne
    Tutee tutee;

    @ManyToOne
    Tutor tutor;

    @Column(name = "state")
    CollaborationState state;

    @Column(name = "subject")
    SubjectEnum subject;

    @Column(name = "start_date", nullable = true)
    Timestamp startTimestamp;

    @Column(name = "end_date", nullable = true)
    Timestamp endTimestamp;

    @Column(name = "termination_reason", nullable = true)
    String terminationReason;

    @OneToOne
    Post post;

    @OneToMany(mappedBy = "collaboration")
    List<Meeting> meetings = new LinkedList<>();

    public Collaboration() {}

    public Long getId() {
        return id;
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

    public Post getPostId() {
        return post;
    }

    public void setPostId(Post post) {
        this.post = post;
    }

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }
}
