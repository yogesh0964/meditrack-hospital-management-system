package com.yogesh.meditrack.service;

import com.yogesh.meditrack.entity.MedicalRecord;
import java.util.List;

public interface MedicalRecordService {

    MedicalRecord saveRecord(MedicalRecord record);

    List<MedicalRecord> getAllRecords();

    MedicalRecord getRecordById(Long id);

    MedicalRecord updateRecord(Long id,
                               MedicalRecord record);

    void deleteRecord(Long id);

}