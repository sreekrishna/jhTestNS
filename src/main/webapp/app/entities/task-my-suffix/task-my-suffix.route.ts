import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITaskMySuffix, TaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { TaskMySuffixComponent } from './task-my-suffix.component';
import { TaskMySuffixDetailComponent } from './task-my-suffix-detail.component';
import { TaskMySuffixUpdateComponent } from './task-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class TaskMySuffixResolve implements Resolve<ITaskMySuffix> {
  constructor(private service: TaskMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((task: HttpResponse<TaskMySuffix>) => {
          if (task.body) {
            return of(task.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskMySuffix());
  }
}

export const taskRoute: Routes = [
  {
    path: '',
    component: TaskMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskMySuffixDetailComponent,
    resolve: {
      task: TaskMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskMySuffixUpdateComponent,
    resolve: {
      task: TaskMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskMySuffixUpdateComponent,
    resolve: {
      task: TaskMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhTestNsApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
