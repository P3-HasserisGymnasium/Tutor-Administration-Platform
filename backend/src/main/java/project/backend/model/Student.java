package project.backend.model;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Student extends User {

    @Column(name = "registration_date")
    Timestamp registrationTimestamp;

    @Column(name = "year_group")
    @Enumerated(EnumType.STRING)
    YearGroupEnum yearGroup;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<StudentCommunicatioInfo> contactInfo;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<TutorApplication> tutorApplications;

    @OneToOne
    @JsonManagedReference
    Tutee tutee;

    @OneToOne
    @JsonManagedReference
    Tutor tutor;

    public Student() {
    }

    public Timestamp getRegistrationTimestamp() {
        return registrationTimestamp;
    }

    public void setRegistrationTimestamp(Timestamp registrationTimestamp) {
        this.registrationTimestamp = registrationTimestamp;
    }

    public YearGroupEnum getYearGroup() {
        return yearGroup;
    }

    public void setYearGroup(YearGroupEnum yearGroup) {
        this.yearGroup = yearGroup;
    }

    public List<StudentCommunicatioInfo> getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(List<StudentCommunicatioInfo> contactInfo) {
        this.contactInfo = contactInfo;
    }

    public List<TutorApplication> getTutorApplications() {
        return tutorApplications;
    }

    public void setTutorApplications(List<TutorApplication> tutorApplications) {
        this.tutorApplications = tutorApplications;
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
}
