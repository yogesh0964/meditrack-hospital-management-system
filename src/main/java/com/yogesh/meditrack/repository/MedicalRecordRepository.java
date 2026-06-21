package com.yogesh.meditrack.repository;

import com.yogesh.meditrack.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {
}