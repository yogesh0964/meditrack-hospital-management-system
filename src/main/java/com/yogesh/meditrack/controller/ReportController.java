package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.repository.AppointmentRepository;
import com.yogesh.meditrack.repository.DoctorRepository;
import com.yogesh.meditrack.repository.PatientRepository;
import com.yogesh.meditrack.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;

    @GetMapping("/dashboard")
    public Map<String, Long> getReport() {

        Map<String, Long> report = new HashMap<>();

        report.put("Total Doctors",
                doctorRepository.count());

        report.put("Total Patients",
                patientRepository.count());

        report.put("Total Appointments",
                appointmentRepository.count());

        report.put("Total Prescriptions",
                prescriptionRepository.count());

        return report;
    }
}