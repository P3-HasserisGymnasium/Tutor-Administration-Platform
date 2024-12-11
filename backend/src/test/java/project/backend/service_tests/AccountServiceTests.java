package project.backend.service_tests;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.transaction.Transactional;
import project.backend.controller_bodies.account_controller.AccountLoginBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.controller_bodies.account_controller.TimeCreateBody;
import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.exceptions.PasswordMismatchException;
import project.backend.exceptions.UserNotFoundException;
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
        body.full_name = "Test User";
        body.password = "password";
        body.confirm_password = "password";


        body.roles = new ArrayList<>();
        body.roles.add(RoleEnum.Tutee);
        body.roles.add(RoleEnum.Tutor);

        body.languages = new ArrayList<>();
        body.languages.add(LanguageEnum.English);
        body.languages.add(LanguageEnum.Danish);

        body.tutor_profile_description = "I am a test user";

        body.subjects = new ArrayList<>();
        body.subjects.add(SubjectEnum.Math);
        body.subjects.add(SubjectEnum.English);

        body.year_group = YearGroupEnum.IB_2;

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
            Student retrievedStudent = studentService.getStudentById(savedUser.getId()).orElse(null);

            assert(retrievedStudent != null);

            assert(retrievedStudent.getEmail().equals(body.email));
            assert(retrievedStudent.getFullName().equals(body.full_name));

            assert(retrievedStudent.getTutor() != null);
            assert(retrievedStudent.getTutee() != null);

            assert(retrievedStudent.getTutor().getTutoringSubjects().containsAll(body.subjects));
            assert(retrievedStudent.getTutor().getProfileDescription().equals(body.tutor_profile_description));

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

    @Test
    @Transactional
    void emailExistsTest() {

        AccountRegisterBody body = new AccountRegisterBody();
        body.email = "emailExistsTest@test.com";
        body.full_name = "Test User";
        body.password = "password";
        body.confirm_password = "password";

        User savedUser = accountService.saveNewStudent(body);
        try {
            assert(accountService.emailExists(body.email));
        }
        finally {
            accountService.deleteUser(savedUser);
        }
    }

    @Test
    @Transactional
    void getUserByEmailTest() {
        
        AccountRegisterBody body = new AccountRegisterBody();
        body.email = "getByEmailTest@test.com";
        body.full_name = "Test User";
        body.password = "password";
        body.confirm_password = "password";

        User savedUser = accountService.saveNewStudent(body);
        try {
            User retrievedUser = accountService.getUserByEmail(body.email).orElse(null);
            assert(retrievedUser != null);
            assert(retrievedUser.getEmail().equals(body.email));
            assert(retrievedUser.getFullName().equals(body.full_name));
        }
        finally {
            accountService.deleteUser(savedUser);
        } 
    }

    @Test
    @Transactional
    void getUserIfCorrectPasswordTest() {
        
        AccountRegisterBody body = new AccountRegisterBody();
        body.email = "getIfCorrectPasswordTest@test.com";
        body.full_name = "Test User";
        body.password = "superSecurePassword";
        body.confirm_password = "superSecurePassword";

        User savedUser = accountService.saveNewStudent(body);
        try {
            AccountLoginBody loginBodyWork = new AccountLoginBody();
            loginBodyWork.email = body.email;
            loginBodyWork.password = body.password;

            User retrievedUser = accountService.getUserIfCorrectPassword(loginBodyWork);
            assert(retrievedUser != null);
            assert(retrievedUser.getEmail().equals(body.email));
            assert(retrievedUser.getFullName().equals(body.full_name));

            AccountLoginBody loginBodyFail = new AccountLoginBody(loginBodyWork);
            loginBodyFail.email = "d=====(￣▽￣*)b";

            try {
                retrievedUser = accountService.getUserIfCorrectPassword(loginBodyFail);
                assert(false);
            }
            catch (Exception e) {
                assert(e instanceof UserNotFoundException);
            }

            loginBodyFail = new AccountLoginBody(loginBodyWork);
            loginBodyFail.password = "wrongPassword";

            try {
                retrievedUser = accountService.getUserIfCorrectPassword(loginBodyFail);
                assert(false);
            }
            catch (Exception e) {
                assert(e instanceof PasswordMismatchException);
            }
        }
        finally {
            accountService.deleteUser(savedUser);
        }
    }


}
