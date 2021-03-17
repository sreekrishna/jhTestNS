import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegionMySuffix, RegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from './region-my-suffix.service';
import { RegionMySuffixComponent } from './region-my-suffix.component';
import { RegionMySuffixDetailComponent } from './region-my-suffix-detail.component';
import { RegionMySuffixUpdateComponent } from './region-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class RegionMySuffixResolve implements Resolve<IRegionMySuffix> {
  constructor(private service: RegionMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((region: HttpResponse<RegionMySuffix>) => {
          if (region.body) {
            return of(region.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegionMySuffix());
  }
}

export const regionRoute: Routes = [
  {
    path: '',
    component: RegionMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegionMySuffixDetailComponent,
    resolve: {
      region: RegionMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegionMySuffixUpdateComponent,
    resolve: {
      region: RegionMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegionMySuffixUpdateComponent,
    resolve: {
      region: RegionMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
