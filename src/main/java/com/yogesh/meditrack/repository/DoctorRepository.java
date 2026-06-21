package com.yogesh.meditrack.repository;

import com.yogesh.meditrack.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository
        extends JpaRepository<Doctor, Long> {
}