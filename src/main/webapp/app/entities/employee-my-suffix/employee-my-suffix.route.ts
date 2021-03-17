import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmployeeMySuffix, EmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from './employee-my-suffix.service';
import { EmployeeMySuffixComponent } from './employee-my-suffix.component';
import { EmployeeMySuffixDetailComponent } from './employee-my-suffix-detail.component';
import { EmployeeMySuffixUpdateComponent } from './employee-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeeMySuffixResolve implements Resolve<IEmployeeMySuffix> {
  constructor(private service: EmployeeMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((employee: HttpResponse<EmployeeMySuffix>) => {
          if (employee.body) {
            return of(employee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeMySuffix());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeMySuffixDetailComponent,
    resolve: {
      employee: EmployeeMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeMySuffixUpdateComponent,
    resolve: {
      employee: EmployeeMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeMySuffixUpdateComponent,
    resolve: {
      employee: EmployeeMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
