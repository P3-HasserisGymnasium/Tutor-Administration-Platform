package project.backend.model;

import jakarta.persistence.ManyToOne;

public class Meeting {
    
    @ManyToOne
    Collaboration collaboration;

    public Meeting(Collaboration collaboration) {
        this.collaboration = collaboration;
    }

    public Collaboration getCollaboration() {
        return collaboration;
    }

    public void setCollaboration(Collaboration collaboration) {
        this.collaboration = collaboration;
    }
}
