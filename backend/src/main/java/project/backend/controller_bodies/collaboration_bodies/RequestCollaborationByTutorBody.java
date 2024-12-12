package project.backend.controller_bodies.collaboration_bodies;

import project.backend.model.Post;

public class RequestCollaborationByTutorBody {
    
    private Long tutor_id;
    private Long tutee_id;
    private Post post;

    public Long getTutor_id() {
        return tutor_id;
    }

    public void setTutor_id(Long tutor_id) {
        this.tutor_id = tutor_id;
    }

    public Long getTutee_id() {
        return tutee_id;
    }

    public void setTutee_id(Long tutee_id) {
        this.tutee_id = tutee_id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    

    
}
