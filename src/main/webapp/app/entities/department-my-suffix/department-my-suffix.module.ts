import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhTestNsSharedModule } from 'app/shared/shared.module';
import { DepartmentMySuffixComponent } from './department-my-suffix.component';
import { DepartmentMySuffixDetailComponent } from './department-my-suffix-detail.component';
import { DepartmentMySuffixUpdateComponent } from './department-my-suffix-update.component';
import { DepartmentMySuffixDeleteDialogComponent } from './department-my-suffix-delete-dialog.component';
import { departmentRoute } from './department-my-suffix.route';

@NgModule({
  imports: [JhTestNsSharedModule, RouterModule.forChild(departmentRoute)],
  declarations: [
    DepartmentMySuffixComponent,
    DepartmentMySuffixDetailComponent,
    DepartmentMySuffixUpdateComponent,
    DepartmentMySuffixDeleteDialogComponent,
  ],
  entryComponents: [DepartmentMySuffixDeleteDialogComponent],
})
export class JhTestNsDepartmentMySuffixModule {}
