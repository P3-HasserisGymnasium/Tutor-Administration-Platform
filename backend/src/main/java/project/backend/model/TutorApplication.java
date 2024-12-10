package project.backend.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;


@Entity
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    private Student student; 
    
    @Column(name = "tutoring_subject")
    @ElementCollection(targetClass = SubjectEnum.class)
    @CollectionTable(name = "tutor_application_subjects", joinColumns = @JoinColumn(name = "application_id"))
    @Enumerated(EnumType.STRING)
    List<SubjectEnum> subjects;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    List<TutorTimeSlot> freeTimeSlots = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    TutorApplicationState state;

    @Column(name = "application_text")
    String description;

    @Column(name = "rejection_reason")
    String rejectionReason;



    public TutorApplication() {}

    public Long getId() {
        return id;
    }

    public Student getStudent(){
        return student;
    }

    public void setStudent(Student student){
        this.student = student;
    }

    public List<SubjectEnum> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectEnum> subjects) {
        this.subjects = subjects;
    }

    public TutorApplicationState getState(){
        return state;
    }

    public void setState(TutorApplicationState state){
        this.state = state;
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

    public List<TutorTimeSlot> getFreeTimeSlots() {
        return freeTimeSlots;
    }

    public void setFreeTimeSlots(List<TutorTimeSlot> freeTimeSlots) {
        this.freeTimeSlots = freeTimeSlots;
    }

    
}
