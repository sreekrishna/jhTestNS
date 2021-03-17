package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.DepartmentService;
import com.mycompany.myapp.domain.Department;
import com.mycompany.myapp.repository.DepartmentRepository;
import com.mycompany.myapp.repository.search.DepartmentSearchRepository;
import com.mycompany.myapp.service.dto.DepartmentDTO;
import com.mycompany.myapp.service.mapper.DepartmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Department}.
 */
@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    private final DepartmentRepository departmentRepository;

    private final DepartmentMapper departmentMapper;

    private final DepartmentSearchRepository departmentSearchRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, DepartmentMapper departmentMapper, DepartmentSearchRepository departmentSearchRepository) {
        this.departmentRepository = departmentRepository;
        this.departmentMapper = departmentMapper;
        this.departmentSearchRepository = departmentSearchRepository;
    }

    @Override
    public DepartmentDTO save(DepartmentDTO departmentDTO) {
        log.debug("Request to save Department : {}", departmentDTO);
        Department department = departmentMapper.toEntity(departmentDTO);
        department = departmentRepository.save(department);
        DepartmentDTO result = departmentMapper.toDto(department);
        departmentSearchRepository.save(department);
        return result;
    }

    @Override
    public List<DepartmentDTO> findAll() {
        log.debug("Request to get all Departments");
        return departmentRepository.findAll().stream()
            .map(departmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    public Optional<DepartmentDTO> findOne(String id) {
        log.debug("Request to get Department : {}", id);
        return departmentRepository.findById(id)
            .map(departmentMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Department : {}", id);
        departmentRepository.deleteById(id);
        departmentSearchRepository.deleteById(id);
    }

    @Override
    public List<DepartmentDTO> search(String query) {
        log.debug("Request to search Departments for query {}", query);
        return StreamSupport
            .stream(departmentSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(departmentMapper::toDto)
        .collect(Collectors.toList());
    }
}
