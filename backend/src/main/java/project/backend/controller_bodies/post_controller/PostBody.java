package project.backend.controller_bodies.post_controller;

import project.backend.model.PostState;
import project.backend.model.SubjectEnum;

import java.util.List;
import java.util.Optional;

public class PostBody {
    public Long userId;
    public String title;
    public String description;
    public SubjectEnum subject;
    public Optional<Boolean> pairing_request;
    public List<Integer> duration; // Use Integer instead of int
    public PostState state;

    public PostBody(Long userId, String title, String description, SubjectEnum subject, List<Integer> duration, PostState state) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.subject = subject;
        this.duration = duration;
        this.state = state;
    }

    public PostBody() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public SubjectEnum getSubject() {
        return subject;
    }

    public void setSubject(SubjectEnum subject) {
        this.subject = subject;
    }

    public List<Integer> getDuration() {
        return duration;
    }

    public void setDuration(List<Integer> duration) {
        this.duration = duration;
    }

    public PostState getState() {
        return state;
    }

    public boolean getIsPairingRequest() {
        return pairing_request.orElse(false);
    }

    public void setPairingRequest(boolean pairing_request) {
        this.pairing_request = Optional.of(pairing_request);
    }

    public void setState(PostState state) {
        this.state = state;
    }

}
