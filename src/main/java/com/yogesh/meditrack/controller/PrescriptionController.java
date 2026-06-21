package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.entity.Prescription;
import com.yogesh.meditrack.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping
    public Prescription savePrescription(
            @RequestBody Prescription prescription) {

        return prescriptionService.savePrescription(
                prescription);
    }

    @GetMapping
    public List<Prescription> getAllPrescriptions() {

        return prescriptionService.getAllPrescriptions();
    }

    @GetMapping("/{id}")
    public Prescription getPrescription(
            @PathVariable Long id) {

        return prescriptionService.getPrescriptionById(id);
    }

    @PutMapping("/{id}")
    public Prescription updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription prescription) {

        return prescriptionService.updatePrescription(
                id,
                prescription);
    }

    @DeleteMapping("/{id}")
    public String deletePrescription(
            @PathVariable Long id) {

        prescriptionService.deletePrescription(id);

        return "Prescription Deleted Successfully";
    }

}