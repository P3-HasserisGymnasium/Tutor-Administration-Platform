package project.backend.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_timestamp")
    Timestamp startTimestamp;

    public Role() {}

    public Long getId() {
        return id;
    }

    public Timestamp getStartDate() {
        return startTimestamp;
    }

    public void setStartDate(Timestamp startTimestamp) {
        this.startTimestamp = startTimestamp;
    }
}
