package project.backend.notification_tests;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import project.backend.model.EntityType;
import project.backend.model.Notification;
import project.backend.model.NotificationState;
import project.backend.model.NotificationType;
import project.backend.repository.NotificationRepository;

@SpringBootTest
public class NotificationRepositoryTest {

    @Autowired
    private NotificationRepository notificationRepository;

    @Test
    public void testSaveAndRetrieveNotification() {
        // Create a new Notification
        Notification notification = new Notification();
        notification.setSenderId(1L);
        notification.setSenderType(EntityType.ADMIN);
        notification.setReceiverId(2L);
        notification.setReceiverType(EntityType.STUDENT);
        notification.setContextId(3L);
        notification.setContextType(EntityType.COLLABORATION);
        notification.setTitle("Test Notification");
        notification.setType(NotificationType.ALERT);
        notification.setState(NotificationState.UNREAD);

        // Save the Notification
        Notification savedNotification = notificationRepository.save(notification);
        assertThat(savedNotification.getId()).isNotNull();

        // Retrieve the Notification
        Notification retrievedNotification = notificationRepository.findById(savedNotification.getId()).orElse(null);
        assertThat(retrievedNotification).isNotNull();
        assertThat(retrievedNotification.getSenderId()).isEqualTo(1L);
        assertThat(retrievedNotification.getTitle()).isEqualTo("Test Notification");
    }
}