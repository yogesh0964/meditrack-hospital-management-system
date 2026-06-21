package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.entity.Patient;
import com.yogesh.meditrack.repository.PatientRepository;
import com.yogesh.meditrack.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl
        implements PatientService {

    private final PatientRepository patientRepository;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Patient Not Found"));
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {

        Patient existing =
                patientRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Patient Not Found"));

        existing.setPatientName(patient.getPatientName());
        existing.setGender(patient.getGender());
        existing.setDob(patient.getDob());
        existing.setEmail(patient.getEmail());
        existing.setPhone(patient.getPhone());
        existing.setAddress(patient.getAddress());

        return patientRepository.save(existing);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}