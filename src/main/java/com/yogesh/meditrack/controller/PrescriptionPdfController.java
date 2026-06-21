package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.entity.Prescription;
import com.yogesh.meditrack.repository.PrescriptionRepository;
import com.yogesh.meditrack.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
public class PrescriptionPdfController {

    private final PdfService pdfService;
    private final PrescriptionRepository prescriptionRepository;

    @GetMapping("/pdf/{id}")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable Long id) {

        Prescription prescription =
                prescriptionRepository
                        .findById(id)
                        .orElseThrow();

        byte[] pdf =
                pdfService
                        .generatePrescriptionPdf(
                                prescription);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=prescription.pdf")
                .contentType(
                        MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}