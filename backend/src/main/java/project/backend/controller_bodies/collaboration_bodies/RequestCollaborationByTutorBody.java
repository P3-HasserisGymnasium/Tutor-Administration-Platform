package project.backend.controller_bodies.collaboration_bodies;

import java.util.List;
import project.backend.model.SubjectEnum;

public class RequestCollaborationByTutorBody {
    
    public Long tutorId;
    public Long userId;
    public String title;
    public String description;
    public SubjectEnum subject;
    public List<Integer> duration;
    
}
