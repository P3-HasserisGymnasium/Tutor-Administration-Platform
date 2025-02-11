package project.backend.controller_bodies.account_controller;

import java.util.LinkedList;
import java.util.List;

import project.backend.model.LanguageEnum;
import project.backend.model.RoleEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;




public class AccountRegisterBody {
    public String full_name;
    public String email;
    public String password; 
    public String confirm_password;
    public List<RoleEnum> roles = new LinkedList<>();
    public YearGroupEnum year_group;
    public List<LanguageEnum> languages = new LinkedList<>();
    public List<SubjectEnum> subjects = new LinkedList<>();
    public String tutor_profile_description;
    public List<TimeSlotCreateBody> time_availability = new LinkedList<>();

    public AccountRegisterBody() {
    }

    public AccountRegisterBody(AccountRegisterBody body) {
        this.full_name = body.full_name;
        this.email = body.email;
        this.password = body.password;
        this.confirm_password = body.confirm_password;
        this.roles = body.roles;
        this.year_group = body.year_group;
        this.languages = body.languages;
        this.subjects = body.subjects;
        this.tutor_profile_description = body.tutor_profile_description;
        this.time_availability = body.time_availability;
    }
}
