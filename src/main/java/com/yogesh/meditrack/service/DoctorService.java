package com.yogesh.meditrack.service;

import com.yogesh.meditrack.entity.Doctor;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DoctorService {

    Doctor saveDoctor(Doctor doctor);

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(Long id);

    Doctor updateDoctor(Long id, Doctor doctor);

    void deleteDoctor(Long id);

    List<Doctor> searchDoctor(String name);

    Page<Doctor> getDoctorsPage(
            int page,
            int size);
    List<Doctor> sortDoctors();
}