package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.entity.MedicalRecord;
import com.yogesh.meditrack.repository.MedicalRecordRepository;
import com.yogesh.meditrack.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRecordServiceImpl
        implements MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    @Override
    public MedicalRecord saveRecord(
            MedicalRecord record) {

        return medicalRecordRepository.save(record);
    }

    @Override
    public List<MedicalRecord> getAllRecords() {

        return medicalRecordRepository.findAll();
    }

    @Override
    public MedicalRecord getRecordById(Long id) {

        return medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Record Not Found"));
    }

    @Override
    public MedicalRecord updateRecord(
            Long id,
            MedicalRecord record) {

        MedicalRecord existing =
                medicalRecordRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Record Not Found"));

        existing.setDiagnosis(record.getDiagnosis());
        existing.setTreatment(record.getTreatment());
        existing.setRecordDate(record.getRecordDate());
        existing.setPatient(record.getPatient());

        return medicalRecordRepository.save(existing);
    }

    @Override
    public void deleteRecord(Long id) {

        medicalRecordRepository.deleteById(id);
    }

}