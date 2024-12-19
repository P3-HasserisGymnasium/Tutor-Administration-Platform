package project.backend.controller_bodies.collaboration_bodies;

import project.backend.model.SubjectEnum;

public class SubmitBody {
  
  Long tutee_id;
  Long tutor_id;
  Long post_id;
  SubjectEnum subject;


  public SubmitBody(Long tutee_id, Long tutor_id, SubjectEnum subject, Long post_id) {
    this.tutee_id = tutee_id;
    this.tutor_id = tutor_id;
    this.subject = subject;
    this.post_id = post_id;
  }

  public Long getTutee_id() {
    return tutee_id;
  }

  public void setTutee_id(Long tutee_id) {
    this.tutee_id = tutee_id;
  }

  public Long getTutor_id() {
    return tutor_id;
  }

  public void setTutor_id(Long tutor_id) {
    this.tutor_id = tutor_id;
  }

  public Long getPost_id() {
    return post_id;
  }

  public void setPost_id(Long post_id) {
    this.post_id = post_id;
  }

  public SubjectEnum getSubject() {
    return subject;
  }

  public void setSubject(SubjectEnum subject) {
    this.subject = subject;
  }


}
