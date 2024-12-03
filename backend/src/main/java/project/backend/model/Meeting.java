package project.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "collaboration_id")
    Collaboration collaboration;

    public Meeting() {}

    public Long getId() {
        return id;
    }

    public Collaboration getCollaboration() {
        return collaboration;
    }

    public void setCollaborationId(Collaboration collaboration) {
        this.collaboration = collaboration;
    }
}
