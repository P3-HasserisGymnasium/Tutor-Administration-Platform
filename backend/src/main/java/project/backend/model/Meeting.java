package project.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @ManyToOne
    Collaboration collaboration;

    public Meeting() {}

    public Collaboration getCollaboration() {
        return collaboration;
    }

    public void setCollaborationId(Collaboration collaboration) {
        this.collaboration = collaboration;
    }
}
