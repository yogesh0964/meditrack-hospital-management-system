package com.yogesh.meditrack.service;

import com.yogesh.meditrack.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    Appointment bookAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(Long id);

    Appointment updateAppointment(Long id,
                                  Appointment appointment);

    void cancelAppointment(Long id);
}