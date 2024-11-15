package project.backend.model;

import java.util.LinkedList;
import java.util.List;

public abstract class Role {
    List<Collaboration> collaborations = new LinkedList<>();
}
