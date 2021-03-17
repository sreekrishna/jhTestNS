package com.mycompany.myapp.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class JobDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobDTO.class);
        JobDTO jobDTO1 = new JobDTO();
        jobDTO1.setId("id1");
        JobDTO jobDTO2 = new JobDTO();
        assertThat(jobDTO1).isNotEqualTo(jobDTO2);
        jobDTO2.setId(jobDTO1.getId());
        assertThat(jobDTO1).isEqualTo(jobDTO2);
        jobDTO2.setId("id2");
        assertThat(jobDTO1).isNotEqualTo(jobDTO2);
        jobDTO1.setId(null);
        assertThat(jobDTO1).isNotEqualTo(jobDTO2);
    }
}
