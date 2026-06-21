package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.entity.Doctor;
import com.yogesh.meditrack.repository.DoctorRepository;
import com.yogesh.meditrack.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl
        implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor Not Found"));
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existing =
                doctorRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Doctor Not Found"));

        existing.setDoctorName(
                doctor.getDoctorName());

        existing.setSpecialization(
                doctor.getSpecialization());

        existing.setEmail(
                doctor.getEmail());

        existing.setPhone(
                doctor.getPhone());

        existing.setDepartment(
                doctor.getDepartment());

        return doctorRepository.save(existing);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
    @Override
    public List<Doctor> searchDoctor(String name) {

        return doctorRepository
                .findByDoctorNameContainingIgnoreCase(name);
    }
    @Override
    public Page<Doctor> getDoctorsPage(
            int page,
            int size) {

        return doctorRepository.findAll(
                PageRequest.of(page, size));
    }
    @Override
    public List<Doctor> sortDoctors() {

        return doctorRepository.findAll(
                Sort.by("doctorName"));
    }
}