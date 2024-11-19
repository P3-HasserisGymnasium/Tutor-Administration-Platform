package project.backend.model;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class Collaboration {
    @ManyToOne
    Tutee tutee;

    @ManyToOne
    Tutor tutor;

    @Column(name = "state")
    CollaborationState state;

    @Column(name = "subject")
    SubjectEnum subject;

    @Column(name = "start_date", nullable = true)
    Date startDate;

    @Column(name = "end_date", nullable = true)
    Date endDate;

    @Column(name = "termination_reason", nullable = true)
    String terminationReason;

    @Column(name = "request_post_id", nullable = true)
    Post post;

    @OneToMany(mappedBy = "collaboration")
    List<Meeting> meetings = new LinkedList<>();

    public Collaboration() {}

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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date date) {
        this.startDate = date;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date date) {
        this.endDate = date;
    }

    public String getTerminationReason() {
        return terminationReason;
    }

    public void setTerminationReason(String reason) {
        this.terminationReason = reason;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }
}
