import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICountryMySuffix, CountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from './country-my-suffix.service';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/region-my-suffix.service';

@Component({
  selector: 'jhi-country-my-suffix-update',
  templateUrl: './country-my-suffix-update.component.html',
})
export class CountryMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  regions: IRegionMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    regionId: [],
  });

  constructor(
    protected countryService: CountryMySuffixService,
    protected regionService: RegionMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);

      this.regionService
        .query({ filter: 'country-is-null' })
        .pipe(
          map((res: HttpResponse<IRegionMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRegionMySuffix[]) => {
          if (!country.regionId) {
            this.regions = resBody;
          } else {
            this.regionService
              .find(country.regionId)
              .pipe(
                map((subRes: HttpResponse<IRegionMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRegionMySuffix[]) => (this.regions = concatRes));
          }
        });
    });
  }

  updateForm(country: ICountryMySuffix): void {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      regionId: country.regionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountryMySuffix {
    return {
      ...new CountryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      regionId: this.editForm.get(['regionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryMySuffix>>): void {
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

  trackById(index: number, item: IRegionMySuffix): any {
    return item.id;
  }
}
