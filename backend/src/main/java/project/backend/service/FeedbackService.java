package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Feedback;
import project.backend.repository.FeedbackRepository;

@Service
public class FeedbackService {
    
    @Autowired
    final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public Optional<Feedback> getFeedbackById(Long id){
        return feedbackRepository.findById(id);
    }

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedbackById(Long id) {
        feedbackRepository.deleteById(id);
    }
}