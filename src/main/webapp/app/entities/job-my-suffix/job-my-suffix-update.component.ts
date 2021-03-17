import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IJobMySuffix, JobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from './job-my-suffix.service';
import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from 'app/entities/task-my-suffix/task-my-suffix.service';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/employee-my-suffix.service';

type SelectableEntity = ITaskMySuffix | IEmployeeMySuffix;

@Component({
  selector: 'jhi-job-my-suffix-update',
  templateUrl: './job-my-suffix-update.component.html',
})
export class JobMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  tasks: ITaskMySuffix[] = [];
  employees: IEmployeeMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    minSalary: [],
    maxSalary: [],
    tasks: [],
    employeeId: [],
  });

  constructor(
    protected jobService: JobMySuffixService,
    protected taskService: TaskMySuffixService,
    protected employeeService: EmployeeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);

      this.taskService.query().subscribe((res: HttpResponse<ITaskMySuffix[]>) => (this.tasks = res.body || []));

      this.employeeService.query().subscribe((res: HttpResponse<IEmployeeMySuffix[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(job: IJobMySuffix): void {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      tasks: job.tasks,
      employeeId: job.employeeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJobMySuffix {
    return {
      ...new JobMySuffix(),
      id: this.editForm.get(['id'])!.value,
      jobTitle: this.editForm.get(['jobTitle'])!.value,
      minSalary: this.editForm.get(['minSalary'])!.value,
      maxSalary: this.editForm.get(['maxSalary'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobMySuffix>>): void {
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

  getSelected(selectedVals: ITaskMySuffix[], option: ITaskMySuffix): ITaskMySuffix {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
