package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.entity.Appointment;
import com.yogesh.meditrack.repository.AppointmentRepository;
import com.yogesh.meditrack.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl
        implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Override
    public Appointment bookAppointment(
            Appointment appointment) {

        appointment.setStatus("BOOKED");

        return appointmentRepository.save(
                appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Appointment Not Found"));
    }

    @Override
    public Appointment updateAppointment(
            Long id,
            Appointment appointment) {

        Appointment existing =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment Not Found"));

        existing.setAppointmentDate(
                appointment.getAppointmentDate());

        existing.setStatus(
                appointment.getStatus());

        existing.setDoctor(
                appointment.getDoctor());

        existing.setPatient(
                appointment.getPatient());

        return appointmentRepository.save(
                existing);
    }

    @Override
    public void cancelAppointment(Long id) {

        appointmentRepository.deleteById(id);
    }
}