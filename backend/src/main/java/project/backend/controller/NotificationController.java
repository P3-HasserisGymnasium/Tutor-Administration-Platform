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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import project.backend.controller_bodies.AuthUser;
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.controller_bodies.notification_controller.NotificationResponseBody;
import project.backend.model.EntityType;
import project.backend.model.Notification;
import project.backend.model.NotificationState;
import project.backend.service.NotificationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService ) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNotification(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        Notification notification = notificationService.getNotificationById(id)
            .orElse(null);

        if (notification == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }

        boolean isReceiver = notification.getReceiverId().equals(authenticatedUser.getUserId()) || 
            (authenticatedUser.getTuteeId() != null && notification.getReceiverId().equals(authenticatedUser.getTuteeId())) || 
            (authenticatedUser.getTutorId() != null && notification.getReceiverId().equals(authenticatedUser.getTutorId()));

        if (!isReceiver && !authenticatedUser.isAdministrator()) {
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

        if (authenticatedUser.getUserId().equals(userId) == false && !authenticatedUser.isAdministrator()) {
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

    @GetMapping("/admin")
    public ResponseEntity<?> getNotificationsForAdmin(HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);

        if (!authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to view notifications for the administrator");
        }

        List<Notification> notifications = notificationService.getAllNotificationsForAdmin();

        if (notifications == null || notifications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No notifications found for the administrator");
        }

        List<NotificationResponseBody> notificationResponseBodies = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponseBodies.add(createNotificationResponseBody(notification));
        }

        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseBodies);
    }

    @GetMapping("/sentToTutee/{id}")
    public ResponseEntity<?> getNotificationsSentToTuteeByUserId(@PathVariable Long id, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        Long userId = authenticatedUser.getUserId();

        if (userId.equals(id) == false || !authenticatedUser.isTutee()) {
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

        System.out.println("id: " + id);
        System.out.println("userId: " + userId);
        System.out.println("authenticatedUser.isTutor " + authenticatedUser.isTutor());
        System.out.println("authenticatedUser.getTutorId() " + authenticatedUser.getTutorId());
        System.out.println("id != userId || !authenticatedUser.isTutor(): " + (userId.equals(id) == false || !authenticatedUser.isTutor()));

        if (id.equals(userId) == false || !authenticatedUser.isTutor()) {
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

        if (authenticatedUser.getUserId().equals(id) == false) {
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

        if (notification.getReceiverId().equals(authenticatedUser.getUserId()) == false && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this notification");
        }

        notificationService.deleteNotification(id);

        return ResponseEntity.status(HttpStatus.OK).body("Notification deleted");
    }

    @PostMapping("/{id}/{state}")
    public ResponseEntity<?> changeNotificationState(@PathVariable Long id, @PathVariable NotificationState state, HttpServletRequest request) {
        AuthenticatedUserBody authenticatedUser = AuthUser.getAuthenticatedUser(request);
        
        Notification notification = notificationService.getNotificationById(id)
            .orElse(null);

        if (notification == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }

        System.out.println("notification.getReceiverId(): " + notification.getReceiverId());
        System.out.println("authenticatedUser.getUserId(): " + authenticatedUser.getUserId());
        System.out.println("authenticatedUser.getTuteeId(): " + authenticatedUser.getTuteeId());
        System.out.println("authenticatedUser.getTutorId(): " + authenticatedUser.getTutorId());
        

        boolean isReceiver = notification.getReceiverId().equals(authenticatedUser.getUserId()) || 
        (authenticatedUser.getTuteeId() != null && notification.getReceiverId().equals(authenticatedUser.getTuteeId())) || 
        (authenticatedUser.getTutorId() != null && notification.getReceiverId().equals(authenticatedUser.getTutorId()));


        if (!isReceiver && !authenticatedUser.isAdministrator()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to change the state of this notification");
        }

        notificationService.changeNotificationState(id, state);

        return ResponseEntity.status(HttpStatus.OK).body("Notification state changed");
    }

    private NotificationResponseBody createNotificationResponseBody(Notification notification) {
        return new NotificationResponseBody(
            notification.getId(),
            notification.getSenderId(),
            notification.getSenderName(),
            notification.getSenderType(),
            notification.getReceiverId(),
            notification.getReceiverName(),
            notification.getContextId(),
            notification.getContextType(),
            notification.getState()
        );
    }
}
