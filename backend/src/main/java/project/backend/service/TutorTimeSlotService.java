package project.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.backend.model.TutorTimeSlot;
import project.backend.repository.TutorTimeslotRepository;


@Service
public class TutorTimeSlotService {
    
    @Autowired
    final TutorTimeslotRepository tutorTimeslotRepository;
    
    public TutorTimeSlotService(TutorTimeslotRepository tutorTimeslotRepository) {
        this.tutorTimeslotRepository = tutorTimeslotRepository;
    }
    public Iterable<TutorTimeSlot> getTutorTimeSlotById(Long id){
        return tutorTimeslotRepository.findAllById(id);
    }
    public TutorTimeSlot saveTutorTimeSlot(TutorTimeSlot tutorTimeSlot) {
        return tutorTimeslotRepository.save(tutorTimeSlot);
    }
    public void deleteTutorTimeSlotById(Long id) {
        tutorTimeslotRepository.deleteById(id);
    }
}
