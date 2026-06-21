package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.entity.Patient;
import com.yogesh.meditrack.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public Patient savePatient(
            @RequestBody Patient patient) {

        return patientService.savePatient(patient);
    }

    @GetMapping
    public List<Patient> getAllPatients() {

        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Patient getPatient(
            @PathVariable Long id) {

        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody Patient patient) {

        return patientService.updatePatient(id, patient);
    }

    @DeleteMapping("/{id}")
    public String deletePatient(
            @PathVariable Long id) {

        patientService.deletePatient(id);

        return "Patient Deleted Successfully";
    }
}