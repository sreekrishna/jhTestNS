import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILocationMySuffix, LocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix/country-my-suffix.service';

@Component({
  selector: 'jhi-location-my-suffix-update',
  templateUrl: './location-my-suffix-update.component.html',
})
export class LocationMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountryMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    streetAddress: [],
    postalCode: [],
    city: [],
    stateProvince: [],
    countryId: [],
  });

  constructor(
    protected locationService: LocationMySuffixService,
    protected countryService: CountryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.countryService
        .query({ filter: 'location-is-null' })
        .pipe(
          map((res: HttpResponse<ICountryMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICountryMySuffix[]) => {
          if (!location.countryId) {
            this.countries = resBody;
          } else {
            this.countryService
              .find(location.countryId)
              .pipe(
                map((subRes: HttpResponse<ICountryMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICountryMySuffix[]) => (this.countries = concatRes));
          }
        });
    });
  }

  updateForm(location: ILocationMySuffix): void {
    this.editForm.patchValue({
      id: location.id,
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      stateProvince: location.stateProvince,
      countryId: location.countryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocationMySuffix {
    return {
      ...new LocationMySuffix(),
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      countryId: this.editForm.get(['countryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationMySuffix>>): void {
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

  trackById(index: number, item: ICountryMySuffix): any {
    return item.id;
  }
}
