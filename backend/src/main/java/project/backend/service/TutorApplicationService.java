package project.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.tutor_application_controller.TutorApplicationCreateBody;
import project.backend.controller_bodies.tutor_application_controller.TutorTimeSlotCreateBody;
import project.backend.model.EntityType;
import project.backend.model.Student;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutor;
import project.backend.model.TutorApplication;
import project.backend.model.TutorApplicationState;
import project.backend.model.TutorTimeSlot;
import project.backend.repository.TutorApplicationRepository;
import project.backend.repository.TutorRepository;
import project.backend.repository.TutorTimeslotRepository;

@Service
public class TutorApplicationService {
    
    @Autowired
    final TutorApplicationRepository tutorApplicationRepository;

    @Autowired
    private final RoleService roleService;

    @Autowired
    private final NotificationService notificationService;

    @Autowired
    final TutorRepository tutorRepository;

    @Autowired
    final TutorTimeslotRepository tutorTimeslotRepository;

    public TutorApplicationService(TutorApplicationRepository tutorApplicationRepository, RoleService roleService, TutorRepository tutorRepository, TutorTimeslotRepository tutorTimeslotRepository, NotificationService notificationService) {
        this.tutorApplicationRepository = tutorApplicationRepository;
        this.roleService = roleService;
        this.tutorRepository = tutorRepository;
        this.tutorTimeslotRepository = tutorTimeslotRepository;
        this.notificationService = notificationService;
    }

    public TutorApplication getTutorApplicationById(Long id){
        return tutorApplicationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Tutor application with ID " + id + " not found"));
    }

    public List<TutorApplication> getAllTutorApplications(){
        return tutorApplicationRepository.findAll();
    }

    public void createTutorApplication(TutorApplicationCreateBody applicationBody, long tuteeId){
        
        TutorApplication tutorApplication = new TutorApplication();

        Student student = roleService.getStudentById(applicationBody.user_id);
        tutorApplication.setStudent(student);
        
        List<TutorApplication> applications = student.getTutorApplications();
        applications.add(tutorApplication);
        student.setTutorApplications(applications);

        tutorApplication.setSubjects(applicationBody.subjects);
        tutorApplication.setDescription(applicationBody.tutor_profile_description);

        TutorApplication savedTutorApplication = tutorApplicationRepository.save(tutorApplication);
        notificationService.sendNotification(tuteeId, EntityType.TUTEE, 0L, EntityType.ADMIN, savedTutorApplication.getId(), EntityType.POST);
        
        for (TutorTimeSlotCreateBody timeSlotBody : applicationBody.time_availability) {
            TutorTimeSlot timeSlot = new TutorTimeSlot();

            timeSlot.setStartTime(timeSlotBody.start_time);
            timeSlot.setEndTime(timeSlotBody.end_time);
            tutorApplication.getFreeTimeSlots().add(timeSlot);

            tutorTimeslotRepository.save(timeSlot);
        }
    }

    public void deleteTutorApplicationById(Long id) {
        tutorApplicationRepository.deleteById(id);
    }

    public void acceptTutorApplication(Long id){
        TutorApplication tutorApplication = getTutorApplicationById(id);

        if(tutorApplication.getState() == TutorApplicationState.ACCEPTED){
            throw new IllegalStateException("Tutor application has already been accepted.");
        }

        tutorApplication.setState(TutorApplicationState.ACCEPTED);
        Student student = tutorApplication.getStudent();

        Tutor tutor = student.getTutor();

        // check if student is applying for new subject or to become tutor
        if(tutor != null){
            List<SubjectEnum> existingTutoringSubjects = tutor.getTutoringSubjects();
            existingTutoringSubjects.addAll(tutorApplication.getSubjects());

            List<TutorTimeSlot> existingTutorTimeSlot = tutor.getFreeTimeSlots();
            existingTutorTimeSlot.addAll(tutorApplication.getFreeTimeSlots());
            tutor.setTutoringSubjects(existingTutoringSubjects);
            
        } else {
            tutor = new Tutor();
            tutor.setStudent(student);
            tutor.setTutoringSubjects(tutorApplication.getSubjects());
            tutor.setFreeTimeSlots(tutorApplication.getFreeTimeSlots());

            student.setTutor(tutor);
        }

        tutorApplicationRepository.save(tutorApplication);
        roleService.saveStudent(student); 
        tutorRepository.save(tutor);
    }

    public void rejectTutorApplication(Long id, String rejectionReason){
        TutorApplication tutorApplication= getTutorApplicationById(id);
        tutorApplication.setState(TutorApplicationState.REJECTED);

        tutorApplication.setRejectionReason(rejectionReason);

        tutorApplicationRepository.save(tutorApplication);
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
