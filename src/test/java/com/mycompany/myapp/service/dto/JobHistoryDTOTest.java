package com.mycompany.myapp.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class JobHistoryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobHistoryDTO.class);
        JobHistoryDTO jobHistoryDTO1 = new JobHistoryDTO();
        jobHistoryDTO1.setId("id1");
        JobHistoryDTO jobHistoryDTO2 = new JobHistoryDTO();
        assertThat(jobHistoryDTO1).isNotEqualTo(jobHistoryDTO2);
        jobHistoryDTO2.setId(jobHistoryDTO1.getId());
        assertThat(jobHistoryDTO1).isEqualTo(jobHistoryDTO2);
        jobHistoryDTO2.setId("id2");
        assertThat(jobHistoryDTO1).isNotEqualTo(jobHistoryDTO2);
        jobHistoryDTO1.setId(null);
        assertThat(jobHistoryDTO1).isNotEqualTo(jobHistoryDTO2);
    }
}
