package project.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.TutorApplication;
import project.backend.model.TutorApplicationState;
import project.backend.model.Tutor;
import project.backend.model.Student;
import project.backend.model.SubjectEnum;
import project.backend.repository.TutorApplicationRepository;

@Service
public class TutorApplicationService {
    
    @Autowired
    final TutorApplicationRepository tutorApplicationRepository;

    @Autowired
    private final RoleService roleService;

    public TutorApplicationService(TutorApplicationRepository tutorApplicationRepository, RoleService roleService ) {
        this.tutorApplicationRepository = tutorApplicationRepository;
        this.roleService = roleService;
    }

    public TutorApplication getTutorApplicationById(Long id){
        return tutorApplicationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Tutor application with ID " + id + " not found"));
    }

    public TutorApplication saveTutorApplication(TutorApplication tutorApplication) {
        return tutorApplicationRepository.save(tutorApplication);
    }

    public void deleteTutorApplicationById(Long id) {
        tutorApplicationRepository.deleteById(id);
    }

    public TutorApplication createTutorApplication(TutorApplication tutorApplication){
        tutorApplication.setState(TutorApplicationState.PENDING);
        return saveTutorApplication(tutorApplication);
    }

    public void acceptTutorApplication(Long id){
        TutorApplication tutorApplication= getTutorApplicationById(id);

        if(tutorApplication.getState() == TutorApplicationState.ACCEPTED){
            throw new IllegalStateException("Tutor application has already been accepted.");
        }

        tutorApplication.setState(TutorApplicationState.ACCEPTED);
        Student student = tutorApplication.getStudent();

        if(student.getTutor() != null){
            throw new IllegalStateException("Student is already a tutor");
        }

        Tutor tutor = new Tutor();
        tutor.setStudent(student);
        student.setTutorId(tutor);

        saveTutorApplication(tutorApplication);
        roleService.saveStudent(student); 

    }

    public void rejectTutorApplication(Long id, String rejectionReason){
        TutorApplication tutorApplication= getTutorApplicationById(id);
        tutorApplication.setState(TutorApplicationState.REJECTED);

        tutorApplication.setRejectionReason(rejectionReason);

        saveTutorApplication(tutorApplication);
    }

    public void removeTutoringSubject(Long studentId, SubjectEnum subject){

        Student student = roleService.getStudentById(studentId);
        Tutor tutor = student.getTutor();
        List<SubjectEnum> currentTutoringSubjects = tutor.getTutoringSubjects();

        if(!currentTutoringSubjects.contains(subject)){
            throw new IllegalArgumentException("Subject " + subject + " is not part of the cuurrent turoing subjects ");
        }

        currentTutoringSubjects.remove(subject);

        roleService.saveStudent(student);
    }

}
