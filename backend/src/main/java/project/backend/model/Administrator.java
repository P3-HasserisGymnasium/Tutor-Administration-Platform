package project.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Administrator extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Administrator() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
