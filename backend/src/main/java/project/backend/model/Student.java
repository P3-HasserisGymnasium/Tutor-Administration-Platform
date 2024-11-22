package project.backend.model;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;

@Entity
public class Student extends User {

    @Column(name = "registration_date")
    Timestamp registrationTimestamp;

    @Column(name = "year_group")
    @Enumerated(EnumType.STRING)
    YearGroupEnum yearGroup;

    @Embedded
    StudentContactInfo contactInfo;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
    Tutee tutee;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
    Tutor tutor;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    List<LanguageEnum> languages = new LinkedList<>();

    public Student() {}

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

    public StudentContactInfo getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(StudentContactInfo contactInfo) {
        this.contactInfo = contactInfo;
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

    public void setTutorId(Tutor tutor) {
        this.tutor = tutor;
    }

    public List<LanguageEnum> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LanguageEnum> languages) {
        this.languages = languages;
    }
}
