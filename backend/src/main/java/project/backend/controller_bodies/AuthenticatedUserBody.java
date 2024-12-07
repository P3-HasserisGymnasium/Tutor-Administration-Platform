package project.backend.controller_bodies;

public class AuthenticatedUserBody {


    public Long userId;
    public Long studentId;
    public Long administratorId;
    public Long tutorId;
    public Long tuteeId;

    public AuthenticatedUserBody() {
    }

    public AuthenticatedUserBody(Long userId, Long studentId, Long administratorId, Long tutorId, Long tuteeId) {
        this.userId = userId;
        this.studentId = studentId;
        this.administratorId = administratorId;
        this.tutorId = tutorId;
        this.tuteeId = tuteeId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public Long getAdministratorId() {
        return administratorId;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public Long getTuteeId() {
        return tuteeId;
    }

    public Boolean isStudent() {
        return studentId != null;
    }

    public Boolean isAdministrator() {
        return administratorId != null;
    }

    public Boolean isTutor() {
        return tutorId != null;
    }

    public Boolean isTutee() {
        return tuteeId != null;
    }
    




}
