package project.backend.controller_bodies.account_controller;
import project.backend.model.RoleEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;
import java.util.List;

public class AccountLoginSuccessBody {
    public String token;
    public Long id;
    public String name;
    public List<RoleEnum> role;
    public String email;
    public YearGroupEnum year_group;
    public List<SubjectEnum> tutoring_subjects;
    public Boolean is_administrator;
}