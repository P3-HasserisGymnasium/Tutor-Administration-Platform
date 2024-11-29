package project.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import project.backend.model.Collaboration;
import project.backend.repository.CollaborationRepository;

@Service
public class CollaborationService {
    
    final CollaborationRepository collaborationRepository;

    public CollaborationService(CollaborationRepository collaborationRepository) {
        this.collaborationRepository = collaborationRepository;
    }

    public Optional<Collaboration> getCollaborationById(Long id){
        return collaborationRepository.findById(id);
    }

    public Collaboration saveCollaboration(Collaboration collaboration) {
        return collaborationRepository.save(collaboration);
    }

    public void deleteCollaborationById(Long id) {
        collaborationRepository.deleteById(id);
    }
}
