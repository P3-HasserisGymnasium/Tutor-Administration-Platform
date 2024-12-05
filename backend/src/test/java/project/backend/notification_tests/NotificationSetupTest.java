package project.backend.notification_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import project.backend.model.EntityType;
import project.backend.model.Notification;
import project.backend.model.NotificationState;

@SpringBootTest
class NotificationSetupTest {

    @Test
    void testNotificationEntitySetup() {
        Notification notification = new Notification();

        // Test setting and getting senderId
        notification.setSenderId(1L);
        assertEquals(1L, notification.getSenderId());

        // Test setting and getting senderType
        notification.setSenderType(EntityType.USER);
        assertEquals(EntityType.USER, notification.getSenderType());

        // Test setting and getting receiverId
        notification.setReceiverId(2L);
        assertEquals(2L, notification.getReceiverId());

        // Test setting and getting receiverType
        notification.setReceiverType(EntityType.ADMIN);
        assertEquals(EntityType.ADMIN, notification.getReceiverType());

        // Test setting and getting contextId
        notification.setContextId(3L);
        assertEquals(3L, notification.getContextId());

        // Test setting and getting contextType
        notification.setContextType(EntityType.POST);
        assertEquals(EntityType.POST, notification.getContextType());

        // Test setting and getting state
        notification.setState(NotificationState.UNREAD);
        assertEquals(NotificationState.UNREAD, notification.getState());
    }
}
