package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.entity.Doctor;
import com.yogesh.meditrack.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@RequestMapping("/admin/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public Doctor saveDoctor(
            @RequestBody Doctor doctor) {

        return doctorService.saveDoctor(doctor);
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {

        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id:\\d+}")
    public Doctor getDoctor(
            @PathVariable Long id) {

        return doctorService.getDoctorById(id);
    }
    @PutMapping("/{id}")
    public Doctor updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(
            @PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return "Doctor Deleted Successfully";
    }
    @GetMapping("/search")
    public List<Doctor> searchDoctor(
            @RequestParam String name){

        return doctorService.searchDoctor(name);
    }
    @GetMapping("/pagination")
    public Page<Doctor> getDoctorsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return doctorService.getDoctorsPage(
                page,
                size);
    }
    @GetMapping("/sort")
    public List<Doctor> sortDoctors() {

        return doctorService.sortDoctors();
    }
}