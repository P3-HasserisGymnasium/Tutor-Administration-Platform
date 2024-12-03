package project.backend.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Tutor extends Role {
    
    @Column(name = "profile_description")
    String profileDescription;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    List<SubjectEnum> tutoringSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "tutor")
    List<Feedback> feedbacks = new ArrayList<>();

    @OneToMany(mappedBy = "tutor")
    List<TutorTimeSlot> freeTimeSlots = new ArrayList<>();

    @OneToMany(mappedBy = "tutor")
    List<Collaboration> collaborations = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "student_id")
    Student student;

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

    public List<Collaboration> getCollaborations() {
        return collaborations;
    }

    public void setCollaborations(List<Collaboration> collaborations) {
        this.collaborations = collaborations;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
