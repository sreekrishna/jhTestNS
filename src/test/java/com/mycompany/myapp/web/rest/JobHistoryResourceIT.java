package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhTestNsApp;
import com.mycompany.myapp.domain.JobHistory;
import com.mycompany.myapp.repository.JobHistoryRepository;
import com.mycompany.myapp.repository.search.JobHistorySearchRepository;
import com.mycompany.myapp.service.JobHistoryService;
import com.mycompany.myapp.service.dto.JobHistoryDTO;
import com.mycompany.myapp.service.mapper.JobHistoryMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.Language;
/**
 * Integration tests for the {@link JobHistoryResource} REST controller.
 */
@SpringBootTest(classes = JhTestNsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class JobHistoryResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Language DEFAULT_LANGUAGE = Language.FRENCH;
    private static final Language UPDATED_LANGUAGE = Language.ENGLISH;

    @Autowired
    private JobHistoryRepository jobHistoryRepository;

    @Autowired
    private JobHistoryMapper jobHistoryMapper;

    @Autowired
    private JobHistoryService jobHistoryService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.JobHistorySearchRepositoryMockConfiguration
     */
    @Autowired
    private JobHistorySearchRepository mockJobHistorySearchRepository;

    @Autowired
    private MockMvc restJobHistoryMockMvc;

    private JobHistory jobHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobHistory createEntity() {
        JobHistory jobHistory = new JobHistory()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .language(DEFAULT_LANGUAGE);
        return jobHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobHistory createUpdatedEntity() {
        JobHistory jobHistory = new JobHistory()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .language(UPDATED_LANGUAGE);
        return jobHistory;
    }

    @BeforeEach
    public void initTest() {
        jobHistoryRepository.deleteAll();
        jobHistory = createEntity();
    }

    @Test
    public void createJobHistory() throws Exception {
        int databaseSizeBeforeCreate = jobHistoryRepository.findAll().size();
        // Create the JobHistory
        JobHistoryDTO jobHistoryDTO = jobHistoryMapper.toDto(jobHistory);
        restJobHistoryMockMvc.perform(post("/api/job-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jobHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the JobHistory in the database
        List<JobHistory> jobHistoryList = jobHistoryRepository.findAll();
        assertThat(jobHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        JobHistory testJobHistory = jobHistoryList.get(jobHistoryList.size() - 1);
        assertThat(testJobHistory.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testJobHistory.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testJobHistory.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the JobHistory in Elasticsearch
        verify(mockJobHistorySearchRepository, times(1)).save(testJobHistory);
    }

    @Test
    public void createJobHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobHistoryRepository.findAll().size();

        // Create the JobHistory with an existing ID
        jobHistory.setId("existing_id");
        JobHistoryDTO jobHistoryDTO = jobHistoryMapper.toDto(jobHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobHistoryMockMvc.perform(post("/api/job-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jobHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the JobHistory in the database
        List<JobHistory> jobHistoryList = jobHistoryRepository.findAll();
        assertThat(jobHistoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the JobHistory in Elasticsearch
        verify(mockJobHistorySearchRepository, times(0)).save(jobHistory);
    }


    @Test
    public void getAllJobHistories() throws Exception {
        // Initialize the database
        jobHistoryRepository.save(jobHistory);

        // Get all the jobHistoryList
        restJobHistoryMockMvc.perform(get("/api/job-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobHistory.getId())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    public void getJobHistory() throws Exception {
        // Initialize the database
        jobHistoryRepository.save(jobHistory);

        // Get the jobHistory
        restJobHistoryMockMvc.perform(get("/api/job-histories/{id}", jobHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(jobHistory.getId()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }
    @Test
    public void getNonExistingJobHistory() throws Exception {
        // Get the jobHistory
        restJobHistoryMockMvc.perform(get("/api/job-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateJobHistory() throws Exception {
        // Initialize the database
        jobHistoryRepository.save(jobHistory);

        int databaseSizeBeforeUpdate = jobHistoryRepository.findAll().size();

        // Update the jobHistory
        JobHistory updatedJobHistory = jobHistoryRepository.findById(jobHistory.getId()).get();
        updatedJobHistory
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .language(UPDATED_LANGUAGE);
        JobHistoryDTO jobHistoryDTO = jobHistoryMapper.toDto(updatedJobHistory);

        restJobHistoryMockMvc.perform(put("/api/job-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jobHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the JobHistory in the database
        List<JobHistory> jobHistoryList = jobHistoryRepository.findAll();
        assertThat(jobHistoryList).hasSize(databaseSizeBeforeUpdate);
        JobHistory testJobHistory = jobHistoryList.get(jobHistoryList.size() - 1);
        assertThat(testJobHistory.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testJobHistory.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testJobHistory.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the JobHistory in Elasticsearch
        verify(mockJobHistorySearchRepository, times(1)).save(testJobHistory);
    }

    @Test
    public void updateNonExistingJobHistory() throws Exception {
        int databaseSizeBeforeUpdate = jobHistoryRepository.findAll().size();

        // Create the JobHistory
        JobHistoryDTO jobHistoryDTO = jobHistoryMapper.toDto(jobHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJobHistoryMockMvc.perform(put("/api/job-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jobHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the JobHistory in the database
        List<JobHistory> jobHistoryList = jobHistoryRepository.findAll();
        assertThat(jobHistoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the JobHistory in Elasticsearch
        verify(mockJobHistorySearchRepository, times(0)).save(jobHistory);
    }

    @Test
    public void deleteJobHistory() throws Exception {
        // Initialize the database
        jobHistoryRepository.save(jobHistory);

        int databaseSizeBeforeDelete = jobHistoryRepository.findAll().size();

        // Delete the jobHistory
        restJobHistoryMockMvc.perform(delete("/api/job-histories/{id}", jobHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<JobHistory> jobHistoryList = jobHistoryRepository.findAll();
        assertThat(jobHistoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the JobHistory in Elasticsearch
        verify(mockJobHistorySearchRepository, times(1)).deleteById(jobHistory.getId());
    }

    @Test
    public void searchJobHistory() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        jobHistoryRepository.save(jobHistory);
        when(mockJobHistorySearchRepository.search(queryStringQuery("id:" + jobHistory.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(jobHistory), PageRequest.of(0, 1), 1));

        // Search the jobHistory
        restJobHistoryMockMvc.perform(get("/api/_search/job-histories?query=id:" + jobHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobHistory.getId())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
}
