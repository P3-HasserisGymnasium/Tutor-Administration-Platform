package project.backend.model;

public enum CollaborationState {
    REJECTED,
    WAITING_FOR_ADMIN,
    WAITING_FOR_TUTOR,
    WAITING_FOR_BOTH,
    WAITING_FOR_TUTEE,
    TERMINATED,
    ESTABLISHED
}
