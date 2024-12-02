package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Post;
import project.backend.model.Student;
import project.backend.model.StudentContactInfo;
import project.backend.model.Tutee;
import project.backend.model.YearGroupEnum;
import project.backend.repository.TuteeRepository;

@Service
public class TuteeService {

    @Autowired
    private final PostService postService;  // Inject PostService

    @Autowired
    final TuteeRepository tuteeRepository;

    public TuteeService(TuteeRepository tuteeRepository, PostService postService) {
        this.tuteeRepository = tuteeRepository;
        this.postService = postService;
    }

    public Optional<Tutee> getTuteeById(Long id){
        return tuteeRepository.findById(id);
    }

    public Tutee saveTutee(Tutee tutee) {
        return tuteeRepository.save(tutee);
    }

    public void deleteTuteeById(Long id) {
        tuteeRepository.deleteById(id);
    }

    public void deletePost(Long postId){
        // Use postService to delete the post
        postService.deletePostById(postId);
    }

    public void createPost(Post post, Long tuteeId){
        postService.createPost(post, tuteeId);
    }

    public void editPost(Long postId, Post editedPost){
        postService.editPost(postId, editedPost);
    }

    public Tutee editProfile(Long tuteeId, YearGroupEnum yearGroup, StudentContactInfo contactInfo){
        Optional<Tutee> tuteeOpt = tuteeRepository.findById(tuteeId);

        if(!tuteeOpt.isPresent()){
            throw new IllegalArgumentException("Tutee not found by ID" + tuteeId);
        }

        Tutee tutee = tuteeOpt.get();
        Student student = tutee.getStudent();

        if(student == null){
            throw new IllegalArgumentException("Tutee is not associated with a student");
        }

        // update student fields
        student.setYearGroup(yearGroup);
        student.setContactInfo(contactInfo);

        return  saveTutee(tutee);
    }


    // center implemention in the respective classes 
    public void requestAdmin(){

    }

    public void selectTutor(){

    }

    public void acceptCollaboration(){

    }

    public void rejectCollaboration(){

    }

}