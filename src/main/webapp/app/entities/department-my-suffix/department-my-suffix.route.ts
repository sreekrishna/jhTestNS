import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentMySuffix, DepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { DepartmentMySuffixComponent } from './department-my-suffix.component';
import { DepartmentMySuffixDetailComponent } from './department-my-suffix-detail.component';
import { DepartmentMySuffixUpdateComponent } from './department-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentMySuffixResolve implements Resolve<IDepartmentMySuffix> {
  constructor(private service: DepartmentMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((department: HttpResponse<DepartmentMySuffix>) => {
          if (department.body) {
            return of(department.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentMySuffix());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepartmentMySuffixDetailComponent,
    resolve: {
      department: DepartmentMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepartmentMySuffixUpdateComponent,
    resolve: {
      department: DepartmentMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepartmentMySuffixUpdateComponent,
    resolve: {
      department: DepartmentMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
