package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Tutee;
import project.backend.repository.TuteeRepository;

@Service
public class TuteeService {

    @Autowired
    final TuteeRepository tuteeRepository;

    public TuteeService(TuteeRepository tuteeRepository) {
        this.tuteeRepository = tuteeRepository;
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
}