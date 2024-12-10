package project.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import project.backend.controller_bodies.role_controller.CommunicationMediumEnum;

@Entity
public class StudentCommunicatioInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @JsonProperty("communication_medium")
    @Enumerated(EnumType.STRING)
    private CommunicationMediumEnum communicationMedium;

    @ManyToOne(cascade = CascadeType.ALL)
    private Student student;

    public StudentCommunicatioInfo() {
    }

    public StudentCommunicatioInfo(String username, CommunicationMediumEnum communicationMedium, Student student) {
        this.username = username;
        this.communicationMedium = communicationMedium;
        this.student = student;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public void setCommunicationMedium(CommunicationMediumEnum communicationMedium) {
        this.communicationMedium = communicationMedium;
    }

    public CommunicationMediumEnum getCommunicationMedium() {
        return this.communicationMedium;
    }
}