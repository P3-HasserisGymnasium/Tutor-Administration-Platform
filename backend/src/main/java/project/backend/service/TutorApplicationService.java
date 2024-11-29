package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.TutorApplication;
import project.backend.repository.TutorApplicationRepository;

@Service
public class TutorApplicationService {
    
    @Autowired
    final TutorApplicationRepository tutorApplicationRepository;

    public TutorApplicationService(TutorApplicationRepository tutorApplicationRepository) {
        this.tutorApplicationRepository = tutorApplicationRepository;
    }

    public Optional<TutorApplication> getTutorApplicationById(Long id){
        return tutorApplicationRepository.findById(id);
    }

    public TutorApplication saveTutorApplication(TutorApplication tutorApplication) {
        return tutorApplicationRepository.save(tutorApplication);
    }

    public void deleteTutorApplicationById(Long id) {
        tutorApplicationRepository.deleteById(id);
    }
}
