package project.backend;

import java.util.LinkedList;
import java.util.List;

public class Tutee extends Role {
    List<Post> posts = new LinkedList<>();
    List<Collaboration> collaborations = new LinkedList<>();
}
