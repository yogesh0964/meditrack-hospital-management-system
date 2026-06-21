package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.entity.MedicalRecord;
import com.yogesh.meditrack.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @PostMapping
    public MedicalRecord saveRecord(
            @RequestBody MedicalRecord record) {

        return medicalRecordService.saveRecord(record);
    }

    @GetMapping
    public List<MedicalRecord> getAllRecords() {

        return medicalRecordService.getAllRecords();
    }

    @GetMapping("/{id}")
    public MedicalRecord getRecord(
            @PathVariable Long id) {

        return medicalRecordService.getRecordById(id);
    }

    @PutMapping("/{id}")
    public MedicalRecord updateRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord record) {

        return medicalRecordService.updateRecord(id, record);
    }

    @DeleteMapping("/{id}")
    public String deleteRecord(
            @PathVariable Long id) {

        medicalRecordService.deleteRecord(id);

        return "Medical Record Deleted";
    }

}