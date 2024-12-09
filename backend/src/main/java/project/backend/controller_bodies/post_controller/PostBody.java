package project.backend.controller_bodies.post_controller;
import project.backend.model.PostState;
import project.backend.model.SubjectEnum;
public class PostBody {
      
     public Long userId;
     public String title;
     public String description;
     public SubjectEnum subject;
     public int duration;
     public PostState state;

}
