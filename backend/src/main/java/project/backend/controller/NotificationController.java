package project.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.backend.controller_bodies.notification_controller.NotificationCreateBody;
import project.backend.model.Notification;
import project.backend.service.NotificationService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{id}")
    public Notification getNotification(@PathVariable Long id) {
        return notificationService.getNotificationById(id)
            .orElse(null);
    }

    @GetMapping("/all")
    public List<Notification> getNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/sentTo/{id}")
    public List<Notification> getNotificationsSentToUserId(@PathVariable Long id) {
        return notificationService.getAllNotificationsSentToUserId(id);
    }

    @GetMapping("/sentBy/{id}")
    public List<Notification> getNotificationsSentByUserId(@PathVariable Long id) {
        return notificationService.getAllNotificationsSentByUserId(id);
    }

    @PostMapping("/")
    public Notification createNotification(@RequestBody NotificationCreateBody notification) {
        return notificationService.createNotification(notification);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }
}