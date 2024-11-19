CREATE TABLE IF NOT EXISTS `users` (
    `id` CHAR(36) PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `students` (
    `id` CHAR(36) PRIMARY KEY,
    `contact_info` JSON NOT NULL,
    `registration_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `year_group` ENUM('PRE-IB', 'IB1', 'IB2') NOT NULL,
    `languages` ENUM('DANISH', 'ENGLISH') NOT NULL
);

CREATE TABLE IF NOT EXISTS `administrators` (
    `id` CHAR(36) PRIMARY KEY,
    `user_id` CHAR(36) NOT NULL
);

CREATE TABLE IF NOT EXISTS `roles` (
    `id` CHAR(36) PRIMARY KEY,
    `student_id` CHAR(36) NOT NULL,
    `start_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `tutees` (
    `id` CHAR(36) PRIMARY KEY,
    -- Make id in tutees a foreign key referencing roles.id
    CONSTRAINT `fk_tutees_roles` FOREIGN KEY (`id`) REFERENCES `roles` (`id`)
);

CREATE TABLE IF NOT EXISTS `tutors` (
    `id` CHAR(36) PRIMARY KEY,
    `tutoring_subjects` ENUM('MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'ECONOMICS', 'BUSINESS', 'ENGLISH', 'DANISH', 'SPANISH', 'FRENCH', 'GERMAN', 'ITAL') NOT NULL,
    `profile_description` LONGTEXT NULL,
    -- Make id in tutors a foreign key referencing roles.id
    CONSTRAINT `fk_tutors_roles` FOREIGN KEY (`id`) REFERENCES `roles` (`id`)
);

CREATE TABLE IF NOT EXISTS `tutor_applications` (
    `id` CHAR(36) PRIMARY KEY,
    `subject` ENUM('MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'ECONOMICS', 'BUSINESS', 'ENGLISH', 'DANISH', 'SPANISH', 'FRENCH', 'GERMAN', 'ITAL') NOT NULL,
    `application_text` LONGTEXT NOT NULL,
    `rejection_reason` LONGTEXT NULL
);

CREATE TABLE IF NOT EXISTS `collaborations` (
    `id` CHAR(36) PRIMARY KEY,
    `end_date` TIMESTAMP NULL,
    `tutee_id` CHAR(36) NOT NULL,
    `request_post_id` CHAR(36) NULL,
    `start_date` TIMESTAMP NULL,
    `tutor_id` CHAR(36) NOT NULL,
    `state` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'TERMINATED') NOT NULL,
    `subject` ENUM('MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'ECONOMICS', 'BUSINESS', 'ENGLISH', 'DANISH', 'SPANISH', 'FRENCH', 'GERMAN', 'ITAL') NOT NULL,
    `termination_reason` ENUM('STUDENT_REQUEST', 'TUTOR_REQUEST', 'NO_SHOW', 'OTHER') NULL
);

CREATE TABLE IF NOT EXISTS `meetings` (
    `id` CHAR(36) PRIMARY KEY,
    `rejection_reason` LONGTEXT NULL,
    `end_date` TIMESTAMP NULL,
    `collaboration_id` CHAR(36) NOT NULL,
    `meeting_description` LONGTEXT NULL,
    `state` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'TERMINATED') NOT NULL,
    `start_date` TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS `feedbacks` (
    `id` CHAR(36) PRIMARY KEY,
    `tutor_id` CHAR(36) NOT NULL,
    `tutee_id` CHAR(36) NOT NULL,
    `submission_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `communication_capabilities` LONGTEXT NULL,
    `other_remarks` LONGTEXT NULL,
    `subject` ENUM('MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'ECONOMICS', 'BUSINESS', 'ENGLISH', 'DANISH', 'SPANISH', 'FRENCH', 'GERMAN', 'ITAL') NOT NULL,
    `knowledge_capabilities` LONGTEXT NULL
);

CREATE TABLE IF NOT EXISTS `posts` (
    `id` CHAR(36) PRIMARY KEY,
    `description` LONGTEXT NOT NULL,
    `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `title` LONGTEXT NOT NULL,
    `tutee_id` CHAR(36) NOT NULL,
    `state` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'TERMINATED') NOT NULL,
    `duration` INT NULL,
    `subject` ENUM('MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'ECONOMICS', 'BUSINESS', 'ENGLISH', 'DANISH', 'SPANISH', 'FRENCH', 'GERMAN', 'ITAL') NOT NULL
);

CREATE TABLE IF NOT EXISTS `free_time_slots` (
    `id` CHAR(36) PRIMARY KEY,
    `start` TIMESTAMP NOT NULL,
    `end` TIMESTAMP NOT NULL,
    `tutor_id` CHAR(36) NOT NULL
);


-- Foreign key constraints
ALTER TABLE `feedbacks`
    ADD CONSTRAINT `feedbacks_tutor_id_foreign` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`);

ALTER TABLE `feedbacks`
    ADD CONSTRAINT `feedbacks_tutee_id_foreign` FOREIGN KEY (`tutee_id`) REFERENCES `tutees` (`id`);

ALTER TABLE `collaborations`
    ADD CONSTRAINT `collaborations_tutee_id_foreign` FOREIGN KEY (`tutee_id`) REFERENCES `tutees` (`id`);

ALTER TABLE `collaborations`
    ADD CONSTRAINT `collaborations_tutor_id_foreign` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`);

ALTER TABLE `meetings`
    ADD CONSTRAINT `meetings_collaboration_id_foreign` FOREIGN KEY (`collaboration_id`) REFERENCES `collaborations` (`id`);

ALTER TABLE `posts`
    ADD CONSTRAINT `posts_tutee_id_foreign` FOREIGN KEY (`tutee_id`) REFERENCES `tutees` (`id`);

ALTER TABLE `students`
    ADD CONSTRAINT `students_id_foreign` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `roles`
    ADD CONSTRAINT `roles_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

ALTER TABLE `administrators`
    ADD CONSTRAINT `administrators_id_foreign` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `free_time_slots`
    ADD CONSTRAINT `free_time_slots_tutor_id_foreign` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`);