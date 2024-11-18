package project.backend.model;

import java.util.LinkedList;
import java.util.List;

public class Collaboration {
    Tutee tutee;
    Tutor tutor;

    List<Meeting> meetings = new LinkedList<>();

    public Collaboration(Tutee tutee, Tutor tutor) {
        this.tutee = tutee;
        this.tutor = tutor;        
    }
}
