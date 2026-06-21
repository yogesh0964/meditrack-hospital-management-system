package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.dto.DashboardResponse;
import com.yogesh.meditrack.repository.AppointmentRepository;
import com.yogesh.meditrack.repository.DoctorRepository;
import com.yogesh.meditrack.repository.PatientRepository;
import com.yogesh.meditrack.repository.PrescriptionRepository;
import com.yogesh.meditrack.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final DoctorRepository doctorRepository;

    private final PatientRepository patientRepository;

    private final AppointmentRepository appointmentRepository;

    private final PrescriptionRepository prescriptionRepository;

    @Override
    public DashboardResponse getDashboardData() {

        return new DashboardResponse(
                doctorRepository.count(),
                patientRepository.count(),
                appointmentRepository.count(),
                prescriptionRepository.count()
        );
    }

}