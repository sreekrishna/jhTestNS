import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJobHistoryMySuffix, JobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from 'app/entities/job-my-suffix/job-my-suffix.service';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/department-my-suffix.service';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/employee-my-suffix.service';

type SelectableEntity = IJobMySuffix | IDepartmentMySuffix | IEmployeeMySuffix;

@Component({
  selector: 'jhi-job-history-my-suffix-update',
  templateUrl: './job-history-my-suffix-update.component.html',
})
export class JobHistoryMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  jobs: IJobMySuffix[] = [];
  departments: IDepartmentMySuffix[] = [];
  employees: IEmployeeMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    jobId: [],
    departmentId: [],
    employeeId: [],
  });

  constructor(
    protected jobHistoryService: JobHistoryMySuffixService,
    protected jobService: JobMySuffixService,
    protected departmentService: DepartmentMySuffixService,
    protected employeeService: EmployeeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      if (!jobHistory.id) {
        const today = moment().startOf('day');
        jobHistory.startDate = today;
        jobHistory.endDate = today;
      }

      this.updateForm(jobHistory);

      this.jobService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IJobMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IJobMySuffix[]) => {
          if (!jobHistory.jobId) {
            this.jobs = resBody;
          } else {
            this.jobService
              .find(jobHistory.jobId)
              .pipe(
                map((subRes: HttpResponse<IJobMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IJobMySuffix[]) => (this.jobs = concatRes));
          }
        });

      this.departmentService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IDepartmentMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDepartmentMySuffix[]) => {
          if (!jobHistory.departmentId) {
            this.departments = resBody;
          } else {
            this.departmentService
              .find(jobHistory.departmentId)
              .pipe(
                map((subRes: HttpResponse<IDepartmentMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDepartmentMySuffix[]) => (this.departments = concatRes));
          }
        });

      this.employeeService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IEmployeeMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEmployeeMySuffix[]) => {
          if (!jobHistory.employeeId) {
            this.employees = resBody;
          } else {
            this.employeeService
              .find(jobHistory.employeeId)
              .pipe(
                map((subRes: HttpResponse<IEmployeeMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmployeeMySuffix[]) => (this.employees = concatRes));
          }
        });
    });
  }

  updateForm(jobHistory: IJobHistoryMySuffix): void {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: jobHistory.language,
      jobId: jobHistory.jobId,
      departmentId: jobHistory.departmentId,
      employeeId: jobHistory.employeeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistoryMySuffix {
    return {
      ...new JobHistoryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value,
      jobId: this.editForm.get(['jobId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
