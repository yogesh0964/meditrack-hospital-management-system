package com.yogesh.meditrack.controller;

import com.yogesh.meditrack.entity.Appointment;
import com.yogesh.meditrack.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public Appointment bookAppointment(
            @RequestBody Appointment appointment) {

        return appointmentService.bookAppointment(
                appointment);
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointment(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        return appointmentService.updateAppointment(
                id,
                appointment);
    }

    @DeleteMapping("/{id}")
    public String cancelAppointment(
            @PathVariable Long id) {

        appointmentService.cancelAppointment(id);

        return "Appointment Cancelled";
    }
}