package project.backend.model;

import java.util.LinkedList;
import java.util.List;

public class Tutor extends Role {
    List<Collaboration> collaborations = new LinkedList<>();
}
