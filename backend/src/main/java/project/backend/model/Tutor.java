package project.backend.model;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Tutor extends Role {
    
    @Column(name = "profile_description")
    String profileDescription;

    @Column(name = "tutoring_subjects")
    List<SubjectEnum> tutoringSubjects = new LinkedList<>();

    @Column(name = "feedbacks")
    List<Feedback> feedbacks = new LinkedList<>();

    @OneToMany(mappedBy = "tutor")
    List<TutorTimeSlot> freeTimeSlots = new LinkedList<>();

    public Tutor() {}

    public String getProfileDescription() {
        return profileDescription;
    }

    public void setProfileDescription(String profileDescription) {
        this.profileDescription = profileDescription;
    }

    public List<SubjectEnum> getTutoringSubjects() {
        return tutoringSubjects;
    }

    public void setTutoringSubjects(List<SubjectEnum> tutoringSubjects) {
        this.tutoringSubjects = tutoringSubjects;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public List<TutorTimeSlot> getFreeTimeSlots() {
        return freeTimeSlots;
    }

    public void setFreeTimeSlots(List<TutorTimeSlot> freeTimeSlots) {
        this.freeTimeSlots = freeTimeSlots;
    }
}
