package project.backend.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.notification_controller.NotificationResponseBody;
import project.backend.model.Administrator;
import project.backend.model.EntityType;
import project.backend.model.Notification;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.service.NotificationService;
import project.backend.service.RoleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final RoleService roleService;

    public NotificationController(NotificationService notificationService, RoleService roleService) {
        this.notificationService = notificationService;
        this.roleService = roleService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNotification(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Notification notification = notificationService.getNotificationById(id)
            .orElse(null);

        if (notification == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }

        if (notification.getReceiverId() != authenticatedUser.getUserId() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view this notification");
        }

        NotificationResponseBody notificationResponseBody = createNotificationResponseBody(notification);

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBody);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getNotifications(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view all notifications");
        }

        List<Notification> notifications = notificationService.getAllNotifications();

        if (notifications == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No notifications found");
        }

        List<NotificationResponseBody> notificationResponseBodies = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseBodies.add(createNotificationResponseBody(notification));
        }

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBodies);
    }

    @GetMapping("/sentToBoth/{userId}")
    public ResponseEntity<?> getNotificationsSentToBothByUserId(@PathVariable Long userId, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (userId != authenticatedUser.getUserId() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view notifications for this user");
        }

        List<Notification> notifications = notificationService.getAllNotificationsSentToUserId(userId);
        List<NotificationResponseBody> notificationResponseBodies = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseBodies.add(createNotificationResponseBody(notification));
        }

        if (notificationResponseBodies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBodies);
    }

    @GetMapping("/sentToTutee/{id}")
    public ResponseEntity<?> getNotificationsSentToTuteeByUserId(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        Long userId = authenticatedUser.getUserId();

        if (id != userId || !authenticatedUser.isTutee()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view notifications for this tutee");
        }

        List<Notification> notifications = notificationService.getAllNotificationsSentToTuteeId(authenticatedUser.getTuteeId());
        List<NotificationResponseBody> notificationResponseBodies = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseBodies.add(createNotificationResponseBody(notification));
        }

        if (notificationResponseBodies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBodies);
    }

    @GetMapping("/sentToTutor/{id}")
    public ResponseEntity<?> getNotificationsSentToTutorByUserId(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        Long userId = authenticatedUser.getUserId();

        if (id != userId || !authenticatedUser.isTutor()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view notifications for this tutor");
        }

        List<Notification> notifications = notificationService.getAllNotificationsSentToTutorId(authenticatedUser.getTutorId());
        List<NotificationResponseBody> notificationResponseBodies = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseBodies.add(createNotificationResponseBody(notification));
        }

        if (notificationResponseBodies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBodies);
    }

    @GetMapping("/sentBy/{id}")
    public ResponseEntity<?> getNotificationsSentByUserId(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (id != authenticatedUser.getUserId()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view notifications sent by this user");
        }

        List<Notification> notifications = notificationService.getAllNotificationsSentByUserId(id);
        if (notifications == null) {
            return ResponseEntity.status(HttpStatus.OK).body("No notifications found");
        }

        notifications.removeIf(notification -> notification.getReceiverType() == EntityType.TUTEE);

        List<NotificationResponseBody> notificationResponseBodies = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseBodies.add(createNotificationResponseBody(notification));
        }

        if (notificationResponseBodies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBodies);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Notification notification = notificationService.getNotificationById(id)
            .orElse(null);

        if (notification == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }

        if (notification.getReceiverId() != authenticatedUser.getUserId() && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this notification");
        }

        notificationService.deleteNotification(id);

        return ResponseEntity.status(HttpStatus.OK).body("Notification deleted");
    }

    private NotificationResponseBody createNotificationResponseBody(Notification notification) {
        String senderName;
        if (notification.getSenderType() == EntityType.TUTOR) {
            Tutor tutor = roleService.getTutorById(notification.getSenderId());
            senderName = tutor != null ? tutor.getStudent().getFullName() : "Unknown";
        } else if (notification.getSenderType() == EntityType.ADMIN) {
            Administrator admin = roleService.getAdministratorById(notification.getSenderId());
            senderName = admin != null ? admin.getFullName() : "Unknown";
        } else {
            senderName = "Unknown";
        }

        String receiverName;
        if (notification.getReceiverType() == EntityType.TUTEE) {
            Tutee tutee = roleService.getTuteeById(notification.getReceiverId());
            receiverName = tutee != null ? tutee.getStudent().getFullName() : "Unknown";
        } else if (notification.getReceiverType() == EntityType.TUTOR) {
            Tutor tutor = roleService.getTutorById(notification.getReceiverId());
            receiverName = tutor != null ? tutor.getStudent().getFullName() : "Unknown";
        } else {
            receiverName = "Unknown";
        }

        return new NotificationResponseBody(
            notification.getSenderId(),
            senderName,
            notification.getSenderType(),
            notification.getReceiverId(),
            receiverName,
            notification.getContextId(),
            notification.getContextType(),
            notification.getState()
        );
    }
}
