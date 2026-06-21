package com.yogesh.meditrack.serviceimpl;

import com.yogesh.meditrack.entity.Department;
import com.yogesh.meditrack.repository.DepartmentRepository;
import com.yogesh.meditrack.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl
        implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public Department saveDepartment(
            Department department) {

        return departmentRepository.save(department);
    }

    @Override
    public List<Department> getAllDepartments() {

        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Department Not Found"));
    }

    @Override
    public void deleteDepartment(Long id) {

        departmentRepository.deleteById(id);
    }
}