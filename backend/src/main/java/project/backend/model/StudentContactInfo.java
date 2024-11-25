package project.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Embeddable;

@Embeddable
public class StudentContactInfo {
    
    @JsonProperty("phone_number")
    String phoneNumber;

    @JsonProperty("discord")
    String discord;

    @JsonProperty("microsoft_teams")
    String microsoftTeams;

    @JsonProperty("skype")
    String skype;

    public StudentContactInfo() {
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDiscord() {
        return this.discord;
    }

    public void setDiscord(String discord) {
        this.discord = discord;
    }

    public String getMicrosoftTeams() {
        return this.microsoftTeams;
    }

    public void setMicrosoftTeams(String microsoftTeams) {
        this.microsoftTeams = microsoftTeams;
    }

    public String getSkype() {
        return this.skype;
    }

    public void setSkype(String skype) {
        this.skype = skype;
    }
}