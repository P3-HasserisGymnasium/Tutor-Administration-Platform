package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> 
{

}
