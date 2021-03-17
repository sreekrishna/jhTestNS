import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDepartmentMySuffix, DepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/location-my-suffix.service';

@Component({
  selector: 'jhi-department-my-suffix-update',
  templateUrl: './department-my-suffix-update.component.html',
})
export class DepartmentMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  locations: ILocationMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    departmentName: [null, [Validators.required]],
    locationId: [],
  });

  constructor(
    protected departmentService: DepartmentMySuffixService,
    protected locationService: LocationMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);

      this.locationService
        .query({ filter: 'department-is-null' })
        .pipe(
          map((res: HttpResponse<ILocationMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocationMySuffix[]) => {
          if (!department.locationId) {
            this.locations = resBody;
          } else {
            this.locationService
              .find(department.locationId)
              .pipe(
                map((subRes: HttpResponse<ILocationMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocationMySuffix[]) => (this.locations = concatRes));
          }
        });
    });
  }

  updateForm(department: IDepartmentMySuffix): void {
    this.editForm.patchValue({
      id: department.id,
      departmentName: department.departmentName,
      locationId: department.locationId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartmentMySuffix {
    return {
      ...new DepartmentMySuffix(),
      id: this.editForm.get(['id'])!.value,
      departmentName: this.editForm.get(['departmentName'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentMySuffix>>): void {
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

  trackById(index: number, item: ILocationMySuffix): any {
    return item.id;
  }
}
