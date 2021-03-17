package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.LocationService;
import com.mycompany.myapp.domain.Location;
import com.mycompany.myapp.repository.LocationRepository;
import com.mycompany.myapp.repository.search.LocationSearchRepository;
import com.mycompany.myapp.service.dto.LocationDTO;
import com.mycompany.myapp.service.mapper.LocationMapper;
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
 * Service Implementation for managing {@link Location}.
 */
@Service
public class LocationServiceImpl implements LocationService {

    private final Logger log = LoggerFactory.getLogger(LocationServiceImpl.class);

    private final LocationRepository locationRepository;

    private final LocationMapper locationMapper;

    private final LocationSearchRepository locationSearchRepository;

    public LocationServiceImpl(LocationRepository locationRepository, LocationMapper locationMapper, LocationSearchRepository locationSearchRepository) {
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
        this.locationSearchRepository = locationSearchRepository;
    }

    @Override
    public LocationDTO save(LocationDTO locationDTO) {
        log.debug("Request to save Location : {}", locationDTO);
        Location location = locationMapper.toEntity(locationDTO);
        location = locationRepository.save(location);
        LocationDTO result = locationMapper.toDto(location);
        locationSearchRepository.save(location);
        return result;
    }

    @Override
    public List<LocationDTO> findAll() {
        log.debug("Request to get all Locations");
        return locationRepository.findAll().stream()
            .map(locationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    public Optional<LocationDTO> findOne(String id) {
        log.debug("Request to get Location : {}", id);
        return locationRepository.findById(id)
            .map(locationMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Location : {}", id);
        locationRepository.deleteById(id);
        locationSearchRepository.deleteById(id);
    }

    @Override
    public List<LocationDTO> search(String query) {
        log.debug("Request to search Locations for query {}", query);
        return StreamSupport
            .stream(locationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(locationMapper::toDto)
        .collect(Collectors.toList());
    }
}
