package project.backend.controller_bodies.role_controller;

import java.util.List;

import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.model.LanguageEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;

public class TutorFilterBody {
    public List<SubjectEnum> subjects;
    public List<TimeSlotCreateBody> time_availability;
    public List<YearGroupEnum> year_group;
    public List<LanguageEnum> languages;
}
