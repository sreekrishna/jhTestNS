package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.CountryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Country}.
 */
public interface CountryService {

    /**
     * Save a country.
     *
     * @param countryDTO the entity to save.
     * @return the persisted entity.
     */
    CountryDTO save(CountryDTO countryDTO);

    /**
     * Get all the countries.
     *
     * @return the list of entities.
     */
    List<CountryDTO> findAll();


    /**
     * Get the "id" country.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CountryDTO> findOne(String id);

    /**
     * Delete the "id" country.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    /**
     * Search for the country corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<CountryDTO> search(String query);
}
