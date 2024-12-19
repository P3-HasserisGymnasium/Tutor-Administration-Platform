package project.backend.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.account_controller.TimeCreateBody;
import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.controller_bodies.role_controller.AddSubjectBody;
import project.backend.controller_bodies.role_controller.TuteeProfileResponse;
import project.backend.controller_bodies.role_controller.TutorProfileResponse;
import project.backend.model.Administrator;
import project.backend.model.Collaboration;
import project.backend.model.LanguageEnum;
import project.backend.model.Meeting;
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
    final CollaborationService collaborationService;

    @Autowired
    final MeetingService meetingService;

    @Autowired
    final AdministratorService administratorService;

    public RoleService(StudentService studentService, TutorService tutorService,
            AdministratorService administratorService, @Lazy CollaborationService collaborationService,
            @Lazy MeetingService meetingService) {
        this.studentService = studentService;
        this.tutorService = tutorService;
        this.administratorService = administratorService;
        this.collaborationService = collaborationService;
        this.meetingService = meetingService;
    }

    public List<TuteeProfileResponse> getTutees() {
        List<Student> studentList = studentService.getTutees();
        ArrayList<TuteeProfileResponse> tutees = new ArrayList<>();
        for (Student student : studentList) {
            Tutee tutee = student.getTutee();
            TuteeProfileResponse tuteeResponse = new TuteeProfileResponse();
            tuteeResponse.setFullName(student.getFullName());
            tuteeResponse.setYearGroup(student.getYearGroup());
            tuteeResponse.setLanguages(student.getLanguages());
            tuteeResponse.setSubjectsReceivingHelpIn(
                    tutee.getCollaborations().stream().map(collab -> collab.getSubject()).toList());
            tuteeResponse.setContactInfo(student.getContactInfo());
            tutees.add(tuteeResponse);
        }
        return tutees;
    }

    public List<TutorProfileResponse> getTutors() {
        List<Student> students = studentService.getTutors();
        List<TutorProfileResponse> tutors = new ArrayList<>();
        for (Student student : students) {
            TutorProfileResponse response = new TutorProfileResponse();
            response.id = student.getTutor().getId();
            response.contact_info = student.getContactInfo();
            response.full_name = student.getFullName();
            response.languages = student.getLanguages();
            response.year_group = student.getYearGroup();

            List<TimeSlotCreateBody> timeSlotRepsonses = new LinkedList<>();
            for (TutorTimeSlot timeSlot : student.getTutor().getFreeTimeSlots()) {
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

            response.tutoring_subjects = student.getTutor().getTutoringSubjects();
            response.description = student.getTutor().getProfileDescription();

            tutors.add(response);
        }
        return tutors;
    }

    public Student saveStudent(Student student) {
        return studentService.saveStudent(student);
    }

    public Tutee getTuteeById(Long id) {
        Student student = studentService.getStudentById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + id));

        Tutee tutee = student.getTutee();

        return tutee;
    }

    public Tutor getTutorByUserId(Long userId) {
        Student student = studentService.getStudentById(userId).orElse(null);

        Tutor tutor = student.getTutor();
        if (tutor == null) {
            return null;
        }

        return tutor;
    }

    public Tutor addSubjectToTutor(AddSubjectBody body) {
        Tutor tutor = tutorService.getTutorById(body.getTutorId())
                .orElseThrow(() -> new IllegalArgumentException("Tutor not found with ID: " + body.getTutorId()));

        if (tutor.getTutoringSubjects().contains(body.getSubject())) {
            throw new IllegalArgumentException("Tutor is already tutoring this subject.");
        }

        tutor.getTutoringSubjects().add(body.getSubject());

        return tutorService.saveTutor(tutor);
    }

    public Tutor removeSubjectFromTutor(AddSubjectBody body) {
        Tutor tutor = tutorService.getTutorById(body.getTutorId())
                .orElseThrow(() -> new IllegalArgumentException("Tutor not found with ID: " + body.getTutorId()));

        if (!tutor.getTutoringSubjects().contains(body.getSubject())) {
            throw new IllegalArgumentException("Tutor is not tutoring this subject.");
        }

        tutor.getTutoringSubjects().remove(body.getSubject());

        List<Collaboration> existingCollaborations = tutor.getCollaborations();
        System.out.println(existingCollaborations.get(0).getSubject());
        Iterator<Collaboration> iterator = existingCollaborations.iterator();
        while (iterator.hasNext()) {
            Collaboration collab = iterator.next();
            if (collab.getSubject() == body.getSubject()) {

                System.out.println("Deleting meeting");
                System.out.println("collab id " + collab.getId());
                System.out.println("collab subject " + collab.getSubject());

                List<Meeting> meetings = collab.getMeetings();

                System.out.println(meetings.size());
                if (meetings.size() > 0) {
                    for (Meeting meeting : meetings) {
                        meetingService.deleteMeetingById(meeting.getId());
                    }
                }
                iterator.remove();
            }
        }

        return tutorService.saveTutor(tutor);
    }

    public Tutee getTuteeByUserId(Long userId) {

        Student student = studentService.getStudentById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + userId));

        Tutee tutee = student.getTutee();
        if (tutee == null) {
            throw new IllegalArgumentException("This student is not assigned a Tutee");
        }

        return tutee;
    }

    public Administrator getAdministratorByUserId(Long userId) {
        return administratorService.getAdministratorById(userId)
                .orElse(null);
    }

    public Tutor getTutorById(Long tutorId) {
        return tutorService.getTutorById(tutorId)
                .orElseThrow(() -> new IllegalArgumentException("Tutor not found with ID: " + tutorId));
    }

    public Administrator getAdministratorById(Long adminId) {
        return administratorService.getAdministratorById(adminId).orElse(null);
    }

    public Student getStudentById(Long id) {
        Optional<Student> studentOpt = studentService.getStudentById(id);

        if (!studentOpt.isPresent()) {
            return null;
        }

        return studentOpt.get();
    }

    public RoleEnum[] getRolesByUserId(Long id) {
        Student student = getStudentById(id);
        Tutor tutor = student.getTutor();
        Tutee tutee = student.getTutee();

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
        if (role == RoleEnum.Tutee && student.getTutee() != null) {
            return student.getTutee();
        } else if (role == RoleEnum.Tutor && student.getTutor() != null) {
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

        List<TimeSlotCreateBody> responseList = new LinkedList<>();
        for (TutorTimeSlot timeSlot : tutor.getFreeTimeSlots()) {
            TimeSlotCreateBody timeSlotResponse = new TimeSlotCreateBody();

            for (TimeSlotCreateBody existingTimeSlot : responseList) {
                if (existingTimeSlot.day == timeSlot.getWeekDay()) {
                    TimeCreateBody timeCreateBody = new TimeCreateBody();
                    timeCreateBody.start_time = timeSlot.getStartTime();
                    timeCreateBody.end_time = timeSlot.getEndTime();
                    existingTimeSlot.time.add(timeCreateBody);
                } else {
                    timeSlotResponse.day = timeSlot.getWeekDay();
                    TimeCreateBody timeCreateBody = new TimeCreateBody();
                    timeCreateBody.start_time = timeSlot.getStartTime();
                    timeCreateBody.end_time = timeSlot.getEndTime();
                    timeSlotResponse.time.add(timeCreateBody);
                    responseList.add(timeSlotResponse);
                }
            }
        }
        response.time_availability = responseList;
        response.languages = tutor.getStudent().getLanguages();

        return response;
    }

    public TuteeProfileResponse getTuteeProfile(Long id) {
        Tutee tutee = getTuteeById(id);

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

    public ArrayList<TutorProfileResponse> getTutorProfilesFiltered(List<SubjectEnum> filterSubjects,
            List<TimeSlotCreateBody> filterTimeAvailabilities, List<YearGroupEnum> filterYearGroups,
            List<LanguageEnum> filterLanguages) {

        // TimeSlotCreateBody to TutorTimeSlot
        List<TutorTimeSlot> filterTimeSlots = new LinkedList<>();
        for (TimeSlotCreateBody timeSlot : filterTimeAvailabilities) {
            for (TimeCreateBody time : timeSlot.time) {
                TutorTimeSlot tutorTimeSlot = new TutorTimeSlot();
                tutorTimeSlot.setWeekDay(timeSlot.day);
                tutorTimeSlot.setStartTime(time.start_time);
                tutorTimeSlot.setEndTime(time.end_time);
                filterTimeSlots.add(tutorTimeSlot);
            }
        }

        List<Tutor> tutors = tutorService.getAllTutors();
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
        if (filterTimeAvailabilities != null && filterTimeAvailabilities.isEmpty() == false) {
            tutors = tutors
                    .stream()
                    .filter(tutor -> {
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

                                if (filterTimeSlot.getWeekDay() == tutorTimeSlot.getWeekDay()
                                        && isTimeSmallerOrEqual(tutorTimeSlotStartTimeHour,
                                                tutorTimeSlotStartTimeMinute, filterTimeSlotStartTimeHour,
                                                filterTimeSlotStartTimeMinute)
                                        && isTimeSmallerOrEqual(filterTimeSlotEndTimeHour, filterTimeSlotEndTimeMinute,
                                                tutorTimeSlotEndTimeHour, tutorTimeSlotEndTimeMinute)) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    })
                    .toList();
        }
        if (filterYearGroups != null && filterYearGroups.isEmpty() == false) {
            tutors = tutors
                    .stream()
                    .filter(tutor -> filterYearGroups.contains(tutor.getStudent().getYearGroup()))
                    .toList();
        }
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

    public void editTutorProfile(Long id, TutorProfileResponse body) {
        Tutor tutor = getTutorByUserId(id);
        Student student = tutor.getStudent();

        student.setFullName(body.full_name);
        student.setYearGroup(body.year_group);
        if (body.contact_info != null) {
            student.getContactInfo().clear(); // Clear existing references
            student.getContactInfo().addAll(body.contact_info); // Add new ones
        }
        student.setLanguages(body.languages);

        tutor.setProfileDescription(body.description);
        tutor.setTutoringSubjects(body.tutoring_subjects);

        // Clear and add new freeTimeSlots
        if (body.time_availability != null) {
            // Clear the existing time slots and remove orphaned TutorTimeSlot instances
            List<TutorTimeSlot> timeSlots = tutor.getFreeTimeSlots();
            timeSlots.clear(); // Clear the collection of time slots

            // Now add the new time slots
            List<TutorTimeSlot> newTimeSlots = new LinkedList<>();
            for (TimeSlotCreateBody timeSlot : body.time_availability) {
                for (TimeCreateBody time : timeSlot.time) {
                    TutorTimeSlot tutorTimeSlot = new TutorTimeSlot();
                    tutorTimeSlot.setWeekDay(timeSlot.day);
                    tutorTimeSlot.setStartTime(time.start_time);
                    tutorTimeSlot.setEndTime(time.end_time);
                    newTimeSlots.add(tutorTimeSlot);
                }
            }
            tutor.setFreeTimeSlots(newTimeSlots); // Set the new time slots list
        }

        // Save the updated tutor
        tutorService.saveTutor(tutor);

    }

    public void removeRole(Long id, RoleEnum role) {
        Student student = getStudentById(id);

        if (role == RoleEnum.Tutee && student.getTutee() != null) {
            student.setTutee(null);
            saveStudent(student);

        } else if (role == RoleEnum.Tutor && student.getTutor() != null) {
            student.setTutor(null);
            saveStudent(student);

        } else {
            throw new IllegalArgumentException("Invalid role specified.");
        }
    }

    boolean isTimeSmallerOrEqual(int smallHour, int smallMinute, int bigHour, int bigMinute) {
        if (smallHour < bigHour) {
            return true;
        } else if (smallHour == bigHour && smallMinute <= bigMinute) {
            return true;
        } else {
            return false;
        }
    }
}
