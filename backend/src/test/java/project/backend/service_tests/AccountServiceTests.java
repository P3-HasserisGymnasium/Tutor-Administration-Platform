package project.backend.service_tests;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.transaction.Transactional;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.controller_bodies.account_controller.TimeCreateBody;
import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.exceptions.EmailAlreadyExistsException;
import project.backend.model.LanguageEnum;
import project.backend.model.RoleEnum;
import project.backend.model.Student;
import project.backend.model.SubjectEnum;
import project.backend.model.User;
import project.backend.model.YearGroupEnum;
import project.backend.service.AccountService;
import project.backend.service.StudentService;
import project.backend.model.WeekDayEnum;

@SpringBootTest
@ActiveProfiles("test")
public class AccountServiceTests {
    
    @Autowired
    private AccountService accountService;

    @Autowired
    private StudentService studentService;

    @Test
    @Transactional
    void createStudentTest() {
        AccountRegisterBody body = new AccountRegisterBody();
        body.email = "createAccountTest@test.com";
        body.fullName = "Test User";
        body.password = "password";
        body.confirmPassword = "password";


        body.roles = new ArrayList<>();
        body.roles.add(RoleEnum.Tutee);
        body.roles.add(RoleEnum.Tutor);

        body.languages = new ArrayList<>();
        body.languages.add(LanguageEnum.English);
        body.languages.add(LanguageEnum.Danish);

        body.tutorProfileDescription = "I am a test user";

        body.subjects = new ArrayList<>();
        body.subjects.add(SubjectEnum.Math);
        body.subjects.add(SubjectEnum.English);

        body.yearGroup = YearGroupEnum.IB_2;

        body.time_availability = new ArrayList<>();

        TimeSlotCreateBody timeSlot = new TimeSlotCreateBody();
        timeSlot.day = WeekDayEnum.Monday;

        TimeCreateBody time = new TimeCreateBody();
        time.start_time = "10:00";
        time.end_time = "12:00";

        timeSlot.time.add(time);
        body.time_availability.add(timeSlot);

        timeSlot = new TimeSlotCreateBody();
        timeSlot.day = WeekDayEnum.Friday;

        time = new TimeCreateBody();
        time.start_time = "9:00";
        time.end_time = "12:00";

        timeSlot.time.add(time);

        time = new TimeCreateBody();
        time.start_time = "13:00";
        time.end_time = "15:00";

        timeSlot.time.add(time);

        body.time_availability.add(timeSlot);

        User savedUser = accountService.saveNewStudent(body);
        try {
            Long id = savedUser.getId();
            System.out.println("@first: " + id);
            Student retrievedStudent = studentService.getStudentById(savedUser.getId()).orElse(null);
            System.out.println("@test: " + retrievedStudent);

            assert(retrievedStudent != null);

            assert(retrievedStudent.getEmail().equals(body.email));
            assert(retrievedStudent.getFullName().equals(body.fullName));

            System.out.println("@test: " + retrievedStudent.getTutor());

            assert(retrievedStudent.getTutor() != null);
            assert(retrievedStudent.getTutee() != null);
            assert(retrievedStudent.getTutor().getTutoringSubjects().containsAll(body.subjects));
            assert(retrievedStudent.getTutor().getProfileDescription().equals(body.tutorProfileDescription));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().size() == 3);
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(0).getWeekDay().equals(WeekDayEnum.Monday));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(0).getStartTime().equals("10:00"));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(0).getEndTime().equals("12:00"));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(1).getWeekDay().equals(WeekDayEnum.Friday));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(1).getStartTime().equals("9:00"));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(1).getEndTime().equals("12:00"));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(2).getWeekDay().equals(WeekDayEnum.Friday));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(2).getStartTime().equals("13:00"));
            assert(retrievedStudent.getTutor().getFreeTimeSlots().get(2).getEndTime().equals("15:00"));

            assert(retrievedStudent.getLanguages().containsAll(body.languages));
        }
        finally {
            accountService.deleteUser(savedUser);
        }
    }
}
