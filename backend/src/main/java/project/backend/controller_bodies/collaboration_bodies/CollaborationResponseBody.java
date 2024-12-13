package project.backend.controller_bodies.collaboration_bodies;

import java.sql.Timestamp;

import project.backend.model.CollaborationState;
import project.backend.model.SubjectEnum;

public class CollaborationResponseBody {
  private Long id;
  private Long tutee_id;
  private Long tutor_id;
  private String tutee_name;
  private String tutor_name;
  private CollaborationState state;
  private SubjectEnum subject;
  private Timestamp start_date;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getTuteeId() {
    return tutee_id;
  }

  public void setTuteeId(Long tutee_id) {
    this.tutee_id = tutee_id;
  }

  public Long getTutorId() {
    return tutor_id;
  }

  public void setTutorId(Long tutor_id) {
    this.tutor_id = tutor_id;
  }

  public String getTuteeName() {
    return tutee_name;
  }

  public void setTuteeName(String tutee_name) {
    this.tutee_name = tutee_name;
  }

  public String getTutorName() {
    return tutor_name;
  }

  public void setTutorName(String tutor_name) {
    this.tutor_name = tutor_name;
  }

  public CollaborationState getState() {
    return state;
  }

  public void setState(CollaborationState state) {
    this.state = state;
  }

  public SubjectEnum getSubject() {
    return subject;
  }

  public void setSubject(SubjectEnum subject) {
    this.subject = subject;
  }


  public Timestamp getStartDate() {
    return start_date;
  }

  public void setStartDate(Timestamp start_date) {
    this.start_date = start_date;
  }
}
