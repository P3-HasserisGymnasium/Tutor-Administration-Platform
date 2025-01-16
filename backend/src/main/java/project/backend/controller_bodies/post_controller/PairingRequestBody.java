package project.backend.controller_bodies.post_controller;

import java.sql.Timestamp;
import java.util.List;

import project.backend.model.PostState;
import project.backend.model.SubjectEnum;

public class PairingRequestBody {
  

    Long id;
    String tutee_name;
    Long tutee_id;
    SubjectEnum subject;
    String title;
    String description;
    Integer minDuration;
    Integer maxDuration;
    Timestamp creationTimestamp;
    Boolean pairingRequest;
    PostState state;


    public PairingRequestBody() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTutee_name() {
        return tutee_name;
    }

    public void setTutee_name(String tutee_name) {
        this.tutee_name = tutee_name;
    }

    public Long getTutee_id() {
        return tutee_id;
    }

    public void setTutee_id(Long tutee_id) {
        this.tutee_id = tutee_id;
    }

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public void setDuration(List<Integer> duration) {
        if (duration == null) {
            this.minDuration = null;
            this.maxDuration = null;
        } else {
            this.minDuration = duration.get(0);
            this.maxDuration = duration.get(1);
        }
    }


    public List<Integer> getDuration() {
        if (this.minDuration == null && this.maxDuration == null) {
            return null;
        } else {
            return List.of(this.minDuration, this.maxDuration);
        } 
    }

    public Timestamp getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(Timestamp creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public Boolean getPairingRequest() {
        return pairingRequest;
    }

    public void setPairingRequest(Boolean pairingRequest) {
        this.pairingRequest = pairingRequest;
    }

    public PostState getState() {
        return state;
    }

    public void setState(PostState state) {
        this.state = state;
    }




}
