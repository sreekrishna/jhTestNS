package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TaskService;
import com.mycompany.myapp.domain.Task;
import com.mycompany.myapp.repository.TaskRepository;
import com.mycompany.myapp.repository.search.TaskSearchRepository;
import com.mycompany.myapp.service.dto.TaskDTO;
import com.mycompany.myapp.service.mapper.TaskMapper;
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
 * Service Implementation for managing {@link Task}.
 */
@Service
public class TaskServiceImpl implements TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    private final TaskSearchRepository taskSearchRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper, TaskSearchRepository taskSearchRepository) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.taskSearchRepository = taskSearchRepository;
    }

    @Override
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        TaskDTO result = taskMapper.toDto(task);
        taskSearchRepository.save(task);
        return result;
    }

    @Override
    public List<TaskDTO> findAll() {
        log.debug("Request to get all Tasks");
        return taskRepository.findAll().stream()
            .map(taskMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    public Optional<TaskDTO> findOne(String id) {
        log.debug("Request to get Task : {}", id);
        return taskRepository.findById(id)
            .map(taskMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
        taskSearchRepository.deleteById(id);
    }

    @Override
    public List<TaskDTO> search(String query) {
        log.debug("Request to search Tasks for query {}", query);
        return StreamSupport
            .stream(taskSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(taskMapper::toDto)
        .collect(Collectors.toList());
    }
}
