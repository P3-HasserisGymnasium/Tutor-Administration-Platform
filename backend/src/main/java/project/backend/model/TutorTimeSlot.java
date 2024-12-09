package project.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class TutorTimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonManagedReference
    Tutor tutor;

    @Column(name = "week_day")
    WeekDayEnum weekDay;

    @Column(name = "start")
    String startTime;

    @Column(name = "end")
    String endTime;

    public TutorTimeSlot() {}

    public Long getId() {
        return id;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public WeekDayEnum getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(WeekDayEnum weekDay) {
        this.weekDay = weekDay;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTimestamp(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTimestamp() {
        return endTime;
    }

    public void setEndTimestamp(String endTime) {
        this.endTime = endTime;
    }
}
