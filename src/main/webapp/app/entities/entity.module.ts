import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-my-suffix',
        loadChildren: () => import('./region-my-suffix/region-my-suffix.module').then(m => m.JhTestNsRegionMySuffixModule),
      },
      {
        path: 'country-my-suffix',
        loadChildren: () => import('./country-my-suffix/country-my-suffix.module').then(m => m.JhTestNsCountryMySuffixModule),
      },
      {
        path: 'location-my-suffix',
        loadChildren: () => import('./location-my-suffix/location-my-suffix.module').then(m => m.JhTestNsLocationMySuffixModule),
      },
      {
        path: 'department-my-suffix',
        loadChildren: () => import('./department-my-suffix/department-my-suffix.module').then(m => m.JhTestNsDepartmentMySuffixModule),
      },
      {
        path: 'task-my-suffix',
        loadChildren: () => import('./task-my-suffix/task-my-suffix.module').then(m => m.JhTestNsTaskMySuffixModule),
      },
      {
        path: 'employee-my-suffix',
        loadChildren: () => import('./employee-my-suffix/employee-my-suffix.module').then(m => m.JhTestNsEmployeeMySuffixModule),
      },
      {
        path: 'job-my-suffix',
        loadChildren: () => import('./job-my-suffix/job-my-suffix.module').then(m => m.JhTestNsJobMySuffixModule),
      },
      {
        path: 'job-history-my-suffix',
        loadChildren: () => import('./job-history-my-suffix/job-history-my-suffix.module').then(m => m.JhTestNsJobHistoryMySuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhTestNsEntityModule {}
