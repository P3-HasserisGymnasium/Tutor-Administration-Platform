package project.backend.controller_bodies.account_controller;

import java.util.LinkedList;
import java.util.List;

import project.backend.model.WeekDayEnum;



public class TimeSlotCreateBody {

    public WeekDayEnum day;
    public List<TimeCreateBody> time = new LinkedList<>();
}