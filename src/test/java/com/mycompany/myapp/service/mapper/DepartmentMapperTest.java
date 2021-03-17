package com.mycompany.myapp.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class DepartmentMapperTest {

    private DepartmentMapper departmentMapper;

    @BeforeEach
    public void setUp() {
        departmentMapper = new DepartmentMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        String id = "id1";
        assertThat(departmentMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(departmentMapper.fromId(null)).isNull();
    }
}
