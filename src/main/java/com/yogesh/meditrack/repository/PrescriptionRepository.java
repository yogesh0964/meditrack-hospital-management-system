package com.yogesh.meditrack.repository;

import com.yogesh.meditrack.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository
        extends JpaRepository<Prescription, Long> {
}