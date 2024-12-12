package project.backend.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.backend.model.LanguageEnum;
import project.backend.model.SubjectEnum;
import project.backend.model.Tutor;
import project.backend.model.TutorTimeSlot;
import project.backend.model.YearGroupEnum;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    // Custom queries for tutors   

}
