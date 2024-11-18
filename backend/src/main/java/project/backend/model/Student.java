package project.backend.model;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Student extends User {

    @Column(name = "registration_date")
    String registrationDate;

    @Column(name = "year_group")
    YearGroupEnum yearGroup;

    @Column(name = "contact_info")
    StudentContactInfo contactInfo;

    @Column(name = "roles")
    List<Role> roles = new LinkedList<>();

    @Column(name = "languages")
    List<LanguageEnum> languages = new LinkedList<>();

    public Student() {}

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<LanguageEnum> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LanguageEnum> languages) {
        this.languages = languages;
    }
}
