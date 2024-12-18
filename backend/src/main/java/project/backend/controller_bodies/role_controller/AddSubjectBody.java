package project.backend.controller_bodies.role_controller;

import project.backend.model.SubjectEnum;

public class AddSubjectBody {

  public Long tutorId;
  public SubjectEnum subject;


  public AddSubjectBody() {
  }

  public AddSubjectBody(Long tutorId, SubjectEnum subject) {
    this.tutorId = tutorId;
    this.subject = subject;
  }

  public Long getTutorId() {
    return this.tutorId;
  }

  public void setTutorId(Long tutorId) {
    this.tutorId = tutorId;
  }

  public SubjectEnum getSubject() {
    return this.subject;
  }

  public void setSubject(SubjectEnum subject) {
    this.subject = subject;
  }

  
}
