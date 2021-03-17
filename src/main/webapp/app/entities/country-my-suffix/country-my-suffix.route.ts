import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICountryMySuffix, CountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from './country-my-suffix.service';
import { CountryMySuffixComponent } from './country-my-suffix.component';
import { CountryMySuffixDetailComponent } from './country-my-suffix-detail.component';
import { CountryMySuffixUpdateComponent } from './country-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class CountryMySuffixResolve implements Resolve<ICountryMySuffix> {
  constructor(private service: CountryMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((country: HttpResponse<CountryMySuffix>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CountryMySuffix());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountryMySuffixDetailComponent,
    resolve: {
      country: CountryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountryMySuffixUpdateComponent,
    resolve: {
      country: CountryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountryMySuffixUpdateComponent,
    resolve: {
      country: CountryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
