package com.mycompany.myapp.service.dto;

import java.time.Instant;
import java.io.Serializable;
import com.mycompany.myapp.domain.enumeration.Language;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.JobHistory} entity.
 */
public class JobHistoryDTO implements Serializable {
    
    private String id;

    private Instant startDate;

    private Instant endDate;

    private Language language;


    private String jobId;

    private String departmentId;

    private String employeeId;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof JobHistoryDTO)) {
            return false;
        }

        return id != null && id.equals(((JobHistoryDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobHistoryDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", language='" + getLanguage() + "'" +
            ", jobId='" + getJobId() + "'" +
            ", departmentId='" + getDepartmentId() + "'" +
            ", employeeId='" + getEmployeeId() + "'" +
            "}";
    }
}
