package project.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.model.Feedback;
import project.backend.service.FeedbackService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/{id}")
    public Feedback getFeedback(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id)
            .orElse(null);
    }

    @PostMapping("/")
    public Feedback creatFeedback(@RequestBody Feedback administrator){
        return feedbackService.saveFeedback(administrator);
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedbackById(id);
    }
}