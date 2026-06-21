package com.yogesh.meditrack.service;

import com.yogesh.meditrack.entity.Prescription;

public interface PdfService {

    byte[] generatePrescriptionPdf(
            Prescription prescription);
}