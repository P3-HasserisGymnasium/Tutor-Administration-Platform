package project.backend.controller_bodies.role_controller;

import project.backend.model.SubjectEnum;

public class AddSubjectBody {

  public Long tutee_tutorId;
  public SubjectEnum subject;


  public AddSubjectBody() {
  }

  public AddSubjectBody(Long tutee_tutorId, SubjectEnum subject) {
    this.tutee_tutorId = tutee_tutorId;
    this.subject = subject;
  }

  public Long getTutorId() {
    return this.tutee_tutorId;
  }

  public void setTutorId(Long tutorId) {
    this.tutee_tutorId = tutorId;
  }

  public SubjectEnum getSubject() {
    return this.subject;
  }

  public void setSubject(SubjectEnum subject) {
    this.subject = subject;
  }

  
}
