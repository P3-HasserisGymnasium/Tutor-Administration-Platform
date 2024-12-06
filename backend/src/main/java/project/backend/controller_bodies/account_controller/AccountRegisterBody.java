package project.backend.controller_bodies.account_controller;

import java.util.LinkedList;
import java.util.List;

import project.backend.model.Language;
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
    public List<Language> languages = new LinkedList<>();
    public List<SubjectEnum> subjects = new LinkedList<>();
    public String tutorProfileDescription;
    public List<TimeSlotCreateBody> time_availability = new LinkedList<>();
}
