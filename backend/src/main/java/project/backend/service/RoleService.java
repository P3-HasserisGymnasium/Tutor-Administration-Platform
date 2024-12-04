package project.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

import project.backend.repository.RoleRepository;

import project.backend.model.RoleEnum;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.model.Student;


@Service
public class RoleService {


  @Autowired 
  final RoleRepository roleRepository;
    
  public RoleService(RoleRepository roleRepository){
    this.roleRepository = roleRepository;
  }

  public List<Student> getTutees(){
    return roleRepository.getTutees();
  }

  public List<Student> getTutors(){
    return roleRepository.getTutors();
  }

  public Student saveStudent(Student student) {
    return roleRepository.save(student);
  }

  public Tutee getTuteeById(Long id){
    Student student = getStudentById(id);

    Tutee tutee = student.getTutee();
    if(tutee == null){
        throw new IllegalArgumentException("This student is not assigned a Tutee");
    }

    return tutee;
  }

  public Tutor getTutorById(Long id){
    Student student = getStudentById(id);

    Tutor tutor = student.getTutor();
    if(tutor == null){
      throw new IllegalArgumentException("This student is not assigned as Tutor");
    }

    return tutor;
  }

  public Student getStudentById(Long id) {
    Optional<Student> studentOpt = roleRepository.findById(id);

    if(!studentOpt.isPresent()){
      throw new IllegalArgumentException("Student not found wiht ID: " + id);
    }

    return studentOpt.get();
  }

  public void assignTuteeRole(Long id){
    Student student = getStudentById(id);

     // Check if the student is already assigned as a Tutee
    if (student.getTutee() != null) {
      throw new IllegalArgumentException("This student is already assigned as a Tutee.");
    }

    Tutee tutee = new Tutee();
    tutee.setStudent(student);
    student.setTutee(tutee);
    roleRepository.save(student);

  }


  public Object getProfile(Long id, RoleEnum role){
    Student student = getStudentById(id);


    if(role == RoleEnum.TUTEE && student.getTutee() != null){
      return student.getTutee();
    } else if(role == RoleEnum.TUTOR && student.getTutor() != null){
      return student.getTutor();
    } else{
      throw new IllegalArgumentException("Invalid role specified.");
    }
  }


  public void editProfile(Long id){
    Student student = getStudentById(id);

    saveStudent(student);
  }


  public void removeRole(Long id, RoleEnum role){
    Student student = getStudentById(id);

    if (role == RoleEnum.TUTEE && student.getTutee() != null){
      student.setTutee(null);
      saveStudent(student);

    }else if(role == RoleEnum.TUTOR && student.getTutor() != null){
      student.setTutorId(null);
      saveStudent(student);

    }else{
      throw new IllegalArgumentException("Invalid role specified.");
    }
  }

}

