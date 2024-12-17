package project.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Tutor;
import project.backend.repository.TutorRepository;

@Service
public class TutorService {
    
    @Autowired
    final TutorRepository tutorRepository;

    public TutorService(TutorRepository tutorRepository) {
        this.tutorRepository = tutorRepository;
    }

    public Optional<Tutor> getTutorById(Long id){
        return tutorRepository.findById(id);
    }

    public Tutor saveTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    public void deleteTutorById(Long id) {
        tutorRepository.deleteById(id);
    }

    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
    }
}