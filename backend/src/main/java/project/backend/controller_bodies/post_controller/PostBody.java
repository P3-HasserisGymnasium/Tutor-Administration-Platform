package project.backend.controller_bodies.post_controller;

import project.backend.model.PostState;
import project.backend.model.SubjectEnum;

import java.util.List;

public class PostBody {

    public Long userId;
    public String title;
    public String description;
    public SubjectEnum subject;
    public List<Integer> duration; // Use Integer instead of int
    public PostState state;

}
