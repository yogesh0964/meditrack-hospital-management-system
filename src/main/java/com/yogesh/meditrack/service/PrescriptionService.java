package com.yogesh.meditrack.service;

import com.yogesh.meditrack.entity.Prescription;
import java.util.List;

public interface PrescriptionService {

    Prescription savePrescription(Prescription prescription);

    List<Prescription> getAllPrescriptions();

    Prescription getPrescriptionById(Long id);

    Prescription updatePrescription(Long id,
                                    Prescription prescription);

    void deletePrescription(Long id);

}