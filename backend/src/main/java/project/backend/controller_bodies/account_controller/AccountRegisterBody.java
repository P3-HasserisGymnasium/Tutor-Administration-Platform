package project.backend.controller_bodies.account_controller;

import java.util.LinkedList;
import java.util.List;

import project.backend.model.LanguageEnum;
import project.backend.model.RoleEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;




public class AccountRegisterBody {
    public String fullName;
    public String email;
    public String password;
    public String confirmPassword;
    public List<RoleEnum> roles = new LinkedList<>();
    public YearGroupEnum yearGroup;
    public List<LanguageEnum> languages = new LinkedList<>();
    public List<SubjectEnum> subjects = new LinkedList<>();
    public String tutorProfileDescription;
    public List<TimeSlotCreateBody> time_availability = new LinkedList<>();

    public AccountRegisterBody() {
    }

    public AccountRegisterBody(AccountRegisterBody body) {
        this.fullName = body.fullName;
        this.email = body.email;
        this.password = body.password;
        this.confirmPassword = body.confirmPassword;
        this.roles = body.roles;
        this.yearGroup = body.yearGroup;
        this.languages = body.languages;
        this.subjects = body.subjects;
        this.tutorProfileDescription = body.tutorProfileDescription;
        this.time_availability = body.time_availability;
    }
}
