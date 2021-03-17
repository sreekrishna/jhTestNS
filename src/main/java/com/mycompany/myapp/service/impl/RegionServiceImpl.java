package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.RegionService;
import com.mycompany.myapp.domain.Region;
import com.mycompany.myapp.repository.RegionRepository;
import com.mycompany.myapp.repository.search.RegionSearchRepository;
import com.mycompany.myapp.service.dto.RegionDTO;
import com.mycompany.myapp.service.mapper.RegionMapper;
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
 * Service Implementation for managing {@link Region}.
 */
@Service
public class RegionServiceImpl implements RegionService {

    private final Logger log = LoggerFactory.getLogger(RegionServiceImpl.class);

    private final RegionRepository regionRepository;

    private final RegionMapper regionMapper;

    private final RegionSearchRepository regionSearchRepository;

    public RegionServiceImpl(RegionRepository regionRepository, RegionMapper regionMapper, RegionSearchRepository regionSearchRepository) {
        this.regionRepository = regionRepository;
        this.regionMapper = regionMapper;
        this.regionSearchRepository = regionSearchRepository;
    }

    @Override
    public RegionDTO save(RegionDTO regionDTO) {
        log.debug("Request to save Region : {}", regionDTO);
        Region region = regionMapper.toEntity(regionDTO);
        region = regionRepository.save(region);
        RegionDTO result = regionMapper.toDto(region);
        regionSearchRepository.save(region);
        return result;
    }

    @Override
    public List<RegionDTO> findAll() {
        log.debug("Request to get all Regions");
        return regionRepository.findAll().stream()
            .map(regionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    public Optional<RegionDTO> findOne(String id) {
        log.debug("Request to get Region : {}", id);
        return regionRepository.findById(id)
            .map(regionMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Region : {}", id);
        regionRepository.deleteById(id);
        regionSearchRepository.deleteById(id);
    }

    @Override
    public List<RegionDTO> search(String query) {
        log.debug("Request to search Regions for query {}", query);
        return StreamSupport
            .stream(regionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(regionMapper::toDto)
        .collect(Collectors.toList());
    }
}
