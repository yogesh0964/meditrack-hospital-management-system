package com.yogesh.meditrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalDoctors;

    private Long totalPatients;

    private Long totalAppointments;

    private Long totalPrescriptions;

}