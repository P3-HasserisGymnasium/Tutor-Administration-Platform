package project.backend.service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.account_controller.TimeCreateBody;
import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.controller_bodies.role_controller.TuteeProfileResponse;
import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.Administrator;
import project.backend.model.Collaboration;
import project.backend.model.LanguageEnum;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.TutorTimeSlot;
import project.backend.model.WeekDayEnum;
import project.backend.model.YearGroupEnum;

@Service
public class RoleService {

    @Autowired
    final StudentService studentService;

    @Autowired
    final TutorService tutorService;

    @Autowired
    final AdministratorService administratorService;

    public RoleService(StudentService studentService, TutorService tutorService, AdministratorService administratorService) {
        this.studentService = studentService;
        this.tutorService = tutorService;
        this.administratorService = administratorService;
    }

    public List<Student> getTutees() {
        return studentService.getTutees();
    }

    public List<Student> getTutors() {
        return studentService.getTutors();
    }

    public Student saveStudent(Student student) {
        return studentService.saveStudent(student);
    }

    public Tutee getTuteeById(Long id){
        Student student = studentService.getStudentById(id)
            .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + id));

        Tutee tutee = student.getTutee();
        if (tutee == null){
            throw new IllegalArgumentException("This student is not assigned a Tutee");
        }

        return tutee;
    }

    public Tutor getTutorByUserId(Long userId){
        Student student = studentService.getStudentById(userId).orElse(null);
        
        Tutor tutor = student.getTutor();
        if (tutor == null){
            return null;
        }

        return tutor;
    }

    public Tutee getTuteeByUserId(Long userId){

        Student student = studentService.getStudentById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + userId));
        
        Tutee tutee = student.getTutee();
        if (tutee == null){
            throw new IllegalArgumentException("This student is not assigned a Tutee");
        }

        return tutee;
    }

    public Administrator getAdministratorByUserId(Long userId){
        return administratorService.getAdministratorById(userId)
            .orElse(null);
    }

    public Tutor getTutorById(Long tutorId){
        return tutorService.getTutorById(tutorId)
            .orElseThrow(() -> new IllegalArgumentException("Tutor not found with ID: " + tutorId));
    }

    public Administrator getAdministratorById(Long adminId){
        return administratorService.getAdministratorById(adminId).orElse(null);
        }

    public Student getStudentById(Long id) {
        Optional<Student> studentOpt = studentService.getStudentById(id);

        if (!studentOpt.isPresent()) {
            throw new IllegalArgumentException("Student not found wiht ID: " + id);
        }

        return studentOpt.get();
    }

    public RoleEnum[] getRolesByUserId(Long id) {
        Student student = getStudentById(id);
        Tutor tutor = student.getTutor();
        Tutee tutee = student.getTutee();
        System.out.println("tutor: " + tutor);
        System.out.println("tutee: " + tutee);
        

        if (tutor != null && tutee != null) {
            return new RoleEnum[] { RoleEnum.Tutor, RoleEnum.Tutee };
        } else if (tutor != null) {
            return new RoleEnum[] { RoleEnum.Tutor };
        } else if (tutee != null) {
            return new RoleEnum[] { RoleEnum.Tutee };
        } else {
            return new RoleEnum[] {};
        }

    }

    public void assignTuteeRole(Long id) {
        Student student = getStudentById(id);

        // Check if the student is already assigned as a Tutee
        if (student.getTutee() != null) {
            throw new IllegalArgumentException("This student is already assigned as a Tutee.");
        }

        Tutee tutee = new Tutee();
        tutee.setStudent(student);
        student.setTutee(tutee);
        studentService.saveStudent(student);

    }

    @Deprecated
    public Object getProfile(Long id, RoleEnum role) {
        Student student = getStudentById(id);
        if(role == RoleEnum.Tutee && student.getTutee() != null){
            return student.getTutee();
        } else if(role == RoleEnum.Tutor && student.getTutor() != null){
            return student.getTutor();
        } else {
            throw new IllegalArgumentException("Invalid role specified.");
        }
    }

    public Student getStudentByTuteeOrTutorId(Long id) {
        Tutee tutee = getTuteeById(id);
        if (tutee == null) {
            return studentService.getStudentByTutorId(id);
        } else {
            return studentService.getStudentByTuteeId(id);
        }
    }

    public TutorProfileResponse getTutorProfile(Long id) {
        Tutor tutor = getTutorById(id);
        TutorProfileResponse response = new TutorProfileResponse();
        response.full_name = tutor.getStudent().getFullName();
        response.description = tutor.getProfileDescription();
        response.year_group = tutor.getStudent().getYearGroup();
        response.tutoring_subjects = tutor.getTutoringSubjects();
        response.contact_info = tutor.getStudent().getContactInfo();

        List<TimeSlotCreateBody> timeSlotRepsonses = new LinkedList<>();
        for (TutorTimeSlot timeSlot : tutor.getFreeTimeSlots()) {
            TimeSlotCreateBody timeSlotResponse = new TimeSlotCreateBody();
            
            WeekDayEnum weekDay = timeSlot.getWeekDay();
            for (WeekDayEnum day : WeekDayEnum.values()) {
                for (TimeSlotCreateBody timeSlotCreateBody : timeSlotRepsonses) {
                    if (timeSlotCreateBody.day == day) {
                        timeSlotResponse = timeSlotCreateBody;
                        break;
                    }
                }
            }

            timeSlotResponse.day = weekDay;

            TimeCreateBody timeCreateBody = new TimeCreateBody();
            timeCreateBody.start_time = timeSlot.getStartTime();
            timeCreateBody.end_time = timeSlot.getEndTime();
            timeSlotResponse.time.add(timeCreateBody);

            timeSlotRepsonses.add(timeSlotResponse);
        }
        response.time_availability = timeSlotRepsonses;
        response.languages = tutor.getStudent().getLanguages();
        
        return response;
    }

    public TuteeProfileResponse getTuteeProfile(Long id) {
        Tutee tutee = getTuteeByUserId(id);

        Student student = tutee.getStudent();

        List<Collaboration> collaborations = tutee.getCollaborations();
        List<SubjectEnum> subjects = collaborations.stream().map(collab -> collab.getSubject()).toList();

        TuteeProfileResponse response = new TuteeProfileResponse();
        response.full_name = student.getFullName();
        response.year_group = student.getYearGroup();
        response.contact_info = student.getContactInfo();
        response.languages = student.getLanguages();
        response.subjects_receiving_help_in = subjects;

        return response;
    }

    public ArrayList<TutorProfileResponse> getTutorProfilesFiltered(List<SubjectEnum> filterSubjects, List<TimeSlotCreateBody> filterTimeAvailabilities, List<YearGroupEnum> filterYearGroups, List<LanguageEnum> filterLanguages) {
        
        System.out.println("timeAvailabilities: " + filterTimeAvailabilities.size());

        // TimeSlotCreateBody to TutorTimeSlot
        List<TutorTimeSlot> filterTimeSlots = new LinkedList<>();
        for (TimeSlotCreateBody timeSlot : filterTimeAvailabilities) {
            for (TimeCreateBody time : timeSlot.time) {
                TutorTimeSlot tutorTimeSlot = new TutorTimeSlot();
                tutorTimeSlot.setWeekDay(timeSlot.day);
                tutorTimeSlot.setStartTime(time.start_time);
                tutorTimeSlot.setEndTime(time.end_time);
                filterTimeSlots.add(tutorTimeSlot);

                System.out.println("parsed to TutorTimeSlot: " + tutorTimeSlot.getWeekDay() + ", " + tutorTimeSlot.getStartTime() + ", " + tutorTimeSlot.getEndTime());
            }
        }

        List<Tutor> tutors = tutorService.getAllTutors();
        System.out.println("@RoleService, tutors found: " + tutors.size());

        System.out.println("@RoleService, filtrering for, subjects: " + filterSubjects + ", timeAvailabilities: " + filterTimeAvailabilities + ", yearGroups: " + filterYearGroups + ", languages: " + filterLanguages);
        if (filterSubjects != null && !filterSubjects.isEmpty()) {
            tutors = tutors
            .stream()
            .filter(tutor -> {
            for (SubjectEnum subject : tutor.getTutoringSubjects()) {
                if (filterSubjects.contains(subject)) {
                return true;
                }
            }
            return false;
            })
            .toList();
        }
        System.out.println("@RoleService, tutors left after first filter: " + tutors.size());
        if (filterTimeAvailabilities != null && filterTimeAvailabilities.isEmpty() == false) {
            tutors = tutors
            .stream()
            .filter(tutor ->{
                List<TutorTimeSlot> tutorTimeSlots = tutor.getFreeTimeSlots();
                for (TutorTimeSlot filterTimeSlot : filterTimeSlots) {
                    for (TutorTimeSlot tutorTimeSlot : tutorTimeSlots) {

                        String[] startTimeFilterArray = filterTimeSlot.getStartTime().split(":");
                        int filterTimeSlotStartTimeHour = Integer.parseInt(startTimeFilterArray[0]);
                        int filterTimeSlotStartTimeMinute = Integer.parseInt(startTimeFilterArray[1]);
                        String[] endTimeFilterArray = filterTimeSlot.getEndTime().split(":");
                        int filterTimeSlotEndTimeHour = Integer.parseInt(endTimeFilterArray[0]);
                        int filterTimeSlotEndTimeMinute = Integer.parseInt(endTimeFilterArray[1]);

                        String[] startTimeTutorArray = tutorTimeSlot.getStartTime().split(":");
                        int tutorTimeSlotStartTimeHour = Integer.parseInt(startTimeTutorArray[0]);
                        int tutorTimeSlotStartTimeMinute = Integer.parseInt(startTimeTutorArray[1]);
                        String[] endTimeTutorArray = tutorTimeSlot.getEndTime().split(":");
                        int tutorTimeSlotEndTimeHour = Integer.parseInt(endTimeTutorArray[0]);
                        int tutorTimeSlotEndTimeMinute = Integer.parseInt(endTimeTutorArray[1]);

                        System.out.println("filterDay: " + filterTimeSlot.getWeekDay() + "\nfilterTimeSlotStartTimeHour: " + filterTimeSlotStartTimeHour + "\nfilterTimeSlotStartTimeMinute: " + filterTimeSlotStartTimeMinute + "\ntutorTimeSlotDay: " + tutorTimeSlot.getWeekDay() + "\ntutorTimeSlotStartTimeHour: " + tutorTimeSlotStartTimeHour + "\ntutorTimeSlotStartTimeMinute: " + tutorTimeSlotStartTimeMinute);
                        System.out.println("filterTimeSlotEndTimeHour: " + filterTimeSlotEndTimeHour + "\nfilterTimeSlotEndTimeMinute: " + filterTimeSlotEndTimeMinute + "\ntutorTimeSlotEndTimeHour: " + tutorTimeSlotEndTimeHour + "\ntutorTimeSlotEndTimeMinute: " + tutorTimeSlotEndTimeMinute);
                        
                        if (filterTimeSlot.getWeekDay() == tutorTimeSlot.getWeekDay() 
                        && isTimeSmallerOrEqual(tutorTimeSlotStartTimeHour, tutorTimeSlotStartTimeMinute, filterTimeSlotStartTimeHour, filterTimeSlotStartTimeMinute)
                        && isTimeSmallerOrEqual(filterTimeSlotEndTimeHour, filterTimeSlotEndTimeMinute, tutorTimeSlotEndTimeHour, tutorTimeSlotEndTimeMinute)) {
                            System.out.println("true");                   
                            return true;     
                        }
                    }
                }
                System.out.println("false");
                return false;
            })
            .toList();
        }
        System.out.println("@RoleService, tutors left after second filter: " + tutors.size());
        if (filterYearGroups != null && filterYearGroups.isEmpty() == false) {
            tutors = tutors
            .stream()
            .filter(tutor -> filterYearGroups.contains(tutor.getStudent().getYearGroup()))
            .toList();
        }
        System.out.println("@RoleService, tutors left after third filter: " + tutors.size());
        if (filterLanguages != null && filterLanguages.isEmpty() == false) {
            tutors = tutors
            .stream()
            .filter(tutor -> {
                for (LanguageEnum language : tutor.getStudent().getLanguages()) {
                    if (filterLanguages.contains(language)) {
                        return true;
                    }
                }
                return false;
            })
            .toList();
        }
        System.out.println("@RoleService, tutors left after fourth filter: " + tutors.size());
        
        ArrayList<TutorProfileResponse> responses = new ArrayList<>();

        for (Tutor tutor : tutors) {
            TutorProfileResponse response = new TutorProfileResponse();
            response.id = tutor.getId();
            response.full_name = tutor.getStudent().getFullName();
            response.description = tutor.getProfileDescription();
            response.year_group = tutor.getStudent().getYearGroup();
            response.tutoring_subjects = tutor.getTutoringSubjects();
            response.contact_info = tutor.getStudent().getContactInfo();

            // TutorTimeSlot to TimeSlotCreateBody
            List<TimeSlotCreateBody> timeSlotRepsonses = new LinkedList<>();
            for (TutorTimeSlot timeSlot : tutor.getFreeTimeSlots()) {
                TimeSlotCreateBody timeSlotResponse = new TimeSlotCreateBody();
                
                WeekDayEnum weekDay = timeSlot.getWeekDay();
                for (WeekDayEnum day : WeekDayEnum.values()) {
                    for (TimeSlotCreateBody timeSlotCreateBody : timeSlotRepsonses) {
                        if (timeSlotCreateBody.day == day) {
                            timeSlotResponse = timeSlotCreateBody;
                            break;
                        }
                    }
                }

                timeSlotResponse.day = weekDay;

                TimeCreateBody timeCreateBody = new TimeCreateBody();
                timeCreateBody.start_time = timeSlot.getStartTime();
                timeCreateBody.end_time = timeSlot.getEndTime();
                timeSlotResponse.time.add(timeCreateBody);

                timeSlotRepsonses.add(timeSlotResponse);
            }
            response.time_availability = timeSlotRepsonses;
            response.languages = tutor.getStudent().getLanguages();

            responses.add(response);
        }

        return responses;
    }

    public void editProfile(Long id) {
        Student student = getStudentById(id);

        saveStudent(student);
    }

    public void removeRole(Long id, RoleEnum role) {
        Student student = getStudentById(id);

        if (role == RoleEnum.Tutee && student.getTutee() != null){
            student.setTutee(null);
            saveStudent(student);

        }else if(role == RoleEnum.Tutor && student.getTutor() != null){
            student.setTutor(null);
            saveStudent(student);

        } else {
            throw new IllegalArgumentException("Invalid role specified.");
        }
    }

    boolean isTimeSmallerOrEqual(int smallHour, int smallMinute, int bigHour, int bigMinute) {
        System.out.println("if " + smallHour + " < " + bigHour);
        System.out.println("else if " + smallHour + " == " + bigHour + " && " + smallMinute + " <= " + bigMinute);
        if (smallHour < bigHour) {
            return true;
        } else if (smallHour == bigHour && smallMinute <= bigMinute) {
            return true;
        } else {
            return false;
        }
    }
}
