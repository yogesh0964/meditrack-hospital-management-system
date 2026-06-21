package com.yogesh.meditrack.serviceimpl;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.yogesh.meditrack.entity.Prescription;
import com.yogesh.meditrack.service.PdfService;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfServiceImpl
        implements PdfService {

    @Override
    public byte[] generatePrescriptionPdf(
            Prescription prescription) {

        try {

            Document document =
                    new Document();

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            PdfWriter.getInstance(
                    document,
                    out);

            document.open();

            document.add(
                    new Paragraph(
                            "MEDITRACK PRESCRIPTION"));

            document.add(
                    new Paragraph(
                            "Patient: "
                                    + prescription.getPatient()
                                    .getPatientName()));

            document.add(
                    new Paragraph(
                            "Doctor: "
                                    + prescription.getDoctor()
                                    .getDoctorName()));

            document.add(
                    new Paragraph(
                            "Medicine: "
                                    + prescription.getMedicine()));

            document.add(
                    new Paragraph(
                            "Dosage: "
                                    + prescription.getDosage()));

            document.add(
                    new Paragraph(
                            "Notes: "
                                    + prescription.getNotes()));

            document.close();

            return out.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "PDF Generation Failed");
        }
    }
}