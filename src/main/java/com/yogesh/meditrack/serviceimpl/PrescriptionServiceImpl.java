package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.entity.Prescription;
import com.yogesh.meditrack.repository.PrescriptionRepository;
import com.yogesh.meditrack.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl
        implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    @Override
    public Prescription savePrescription(
            Prescription prescription) {

        return prescriptionRepository.save(
                prescription);
    }

    @Override
    public List<Prescription> getAllPrescriptions() {

        return prescriptionRepository.findAll();
    }

    @Override
    public Prescription getPrescriptionById(Long id) {

        return prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prescription Not Found"));
    }

    @Override
    public Prescription updatePrescription(
            Long id,
            Prescription prescription) {

        Prescription existing =
                prescriptionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Prescription Not Found"));

        existing.setMedicine(
                prescription.getMedicine());

        existing.setDosage(
                prescription.getDosage());

        existing.setNotes(
                prescription.getNotes());

        existing.setDoctor(
                prescription.getDoctor());

        existing.setPatient(
                prescription.getPatient());

        return prescriptionRepository.save(
                existing);
    }

    @Override
    public void deletePrescription(Long id) {

        prescriptionRepository.deleteById(id);
    }

}