package project.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServlet;
import jakarta.transaction.Transactional;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.account_controller.AccountRegisterBody;
import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.controller_bodies.collaboration_bodies.RequestCollaborationByPostBody;
import project.backend.controller_bodies.post_controller.PostBody;
import project.backend.controller_bodies.account_controller.TimeCreateBody;
import project.backend.model.Administrator;
import project.backend.model.EntityType;
import project.backend.model.LanguageEnum;
import project.backend.model.NotificationState;
import project.backend.model.Post;
import project.backend.model.PostState;
import project.backend.model.RoleEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.User;
import project.backend.model.WeekDayEnum;
import project.backend.model.YearGroupEnum;
import project.backend.repository.AdministratorRepository;
import project.backend.service.AccountService;
import project.backend.service.CollaborationService;
import project.backend.service.PasswordService;
import project.backend.model.Student;
import project.backend.service.PostService;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/demo")
public class DemoController {

    final AccountService accountService;
    final PostService postService;
    final CollaborationService collaborationService;

    final AdministratorRepository administratorRepository;

    public DemoController(AccountService accountService, PostService postService,
            CollaborationService collaborationService,
            AdministratorRepository administratorRepository) {
        this.accountService = accountService;
        this.postService = postService;
        this.collaborationService = collaborationService;

        this.administratorRepository = administratorRepository;
    }

    @PostMapping("/setup")
    public void SetupDemo() {
        System.out.println("@DemoController, Setting up demo");

        AccountRegisterBody tuteeRequest = createTutee();
        AccountRegisterBody tutorRequest = createTutor();
        AccountRegisterBody adminRequest = createAdmin();

        System.out.println("@DemoController, Deleting existing users");

        Optional<User> tuteeOptional = accountService.getUserByEmail(tuteeRequest.email);
        Optional<User> tutorOptional = accountService.getUserByEmail(tutorRequest.email);
        Optional<User> adminOptional = accountService.getUserByEmail(adminRequest.email);

        if (tuteeOptional.isPresent())
            accountService.deleteUser(tuteeOptional.get());
        if (tutorOptional.isPresent())
            accountService.deleteUser(tutorOptional.get());
        if (adminOptional.isPresent())
            accountService.deleteUser(adminOptional.get());

        System.out.println("@DemoController, Creating new users");

        User tuteeUser = accountService.saveNewStudent(tuteeRequest);
        User tutorUser = accountService.saveNewStudent(tutorRequest);
        SaveNewAdmin(adminRequest);

        System.out.println("@DemoController, Creating new posts");

        List<PostBody> posts = createPosts(tuteeUser);
        Tutee tutee = ((Student) tuteeUser).getTutee();
        Tutor tutor = ((Student) tutorUser).getTutor();

        boolean first = true;
        for (PostBody postBody : posts) {
            Post post = postService.createPost(postBody, tutee.getId());
            if (first) {
                System.out.println("@DemoController, Creating collaboration request");

                first = false;
                RequestCollaborationByPostBody request = createCollaborationRequest(post, tutorUser);
                collaborationService.requestCollaborationByPost(request);

                collaborationService.sendNotification(tutor.getId(), EntityType.TUTOR, post.getTutee().getId(),
                        EntityType.TUTEE, post.getId(), EntityType.POST);
            }
        }

        System.out.println("@DemoController, Demo setup complete");
    }

    private AccountRegisterBody createTutee() {
        AccountRegisterBody tutee = new AccountRegisterBody();
        tutee.full_name = "tutee@tutee.com";
        tutee.email = "tutee@tutee.com";
        tutee.password = "tutee@tutee.com";
        tutee.confirm_password = "tutee@tutee.com";
        tutee.roles.add(RoleEnum.Tutee);
        tutee.year_group = YearGroupEnum.PRE_IB;
        tutee.languages.add(LanguageEnum.English);

        return tutee;
    }

    private AccountRegisterBody createTutor() {
        AccountRegisterBody tutor = new AccountRegisterBody();
        tutor.full_name = "tutor@tutor.com";
        tutor.email = "tutor@tutor.com";
        tutor.password = "tutor@tutor.com";
        tutor.confirm_password = "tutor@tutor.com";
        tutor.roles.add(RoleEnum.Tutor);
        tutor.year_group = YearGroupEnum.PRE_IB;
        tutor.languages.add(LanguageEnum.English);
        tutor.subjects.add(SubjectEnum.Math);
        tutor.subjects.add(SubjectEnum.English);
        tutor.subjects.add(SubjectEnum.Physics);
        tutor.time_availability = createTutorTimeSlot();
        tutor.tutor_profile_description = "I am a tutor";

        return tutor;
    }

    private List<TimeSlotCreateBody> createTutorTimeSlot() {
        List<TimeSlotCreateBody> timeSlots = new LinkedList<>();
        TimeSlotCreateBody timeSlot = new TimeSlotCreateBody();
        timeSlot.day = WeekDayEnum.Monday;
        timeSlot.time = createTutorTime();
        timeSlots.add(timeSlot);

        return timeSlots;
    }

    private List<TimeCreateBody> createTutorTime() {
        List<TimeCreateBody> times = new LinkedList<>();
        TimeCreateBody time = new TimeCreateBody();
        time.start_time = "15:00";
        time.end_time = "16:00";
        times.add(time);

        return times;
    }

    private AccountRegisterBody createAdmin() {
        AccountRegisterBody admin = new AccountRegisterBody();
        admin.full_name = "admin@admin.com";
        admin.email = "admin@admin.com";
        admin.password = "admin@admin.com";
        admin.confirm_password = "admin@admin.com";

        return admin;
    }

    @Transactional
    private void SaveNewAdmin(AccountRegisterBody adminRequest) {
        Administrator admin = new Administrator();
        admin.setEmail(adminRequest.email);
        admin.setFullName(adminRequest.full_name);
        String passwordHash = PasswordService.encodePassword(adminRequest.password);
        admin.setPasswordHash(passwordHash);
        administratorRepository.save(admin);
    }

    private List<PostBody> createPosts(User user) {
        List<PostBody> posts = new LinkedList<>();
        PostBody postMath = new PostBody();
        postMath.userId = user.getId();
        postMath.title = "Math";
        postMath.subject = SubjectEnum.Math;
        postMath.duration = new LinkedList<>();
        postMath.duration.add(3);
        postMath.duration.add(6);
        postMath.description = "I need help with math";
        postMath.setPairingRequest(false);
        postMath.state = PostState.VISIBLE;
        posts.add(postMath);

        PostBody postDanish = new PostBody();
        postDanish.userId = user.getId();
        postDanish.title = "Danish";
        postDanish.subject = SubjectEnum.Danish;
        postDanish.duration = new LinkedList<>();
        postDanish.duration.add(0);
        postDanish.duration.add(6);
        postDanish.description = "I need help with danish";
        postDanish.setPairingRequest(false);
        postDanish.state = PostState.VISIBLE;
        posts.add(postDanish);

        return posts;
    }

    private RequestCollaborationByPostBody createCollaborationRequest(Post post, User tutorUser) {
        RequestCollaborationByPostBody request = new RequestCollaborationByPostBody();
        request.setPost_id(post.getId());
        request.setTutorUserId(tutorUser.getId());

        return request;
    }
}
