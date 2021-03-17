import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhTestNsSharedModule } from 'app/shared/shared.module';
import { TaskMySuffixComponent } from './task-my-suffix.component';
import { TaskMySuffixDetailComponent } from './task-my-suffix-detail.component';
import { TaskMySuffixUpdateComponent } from './task-my-suffix-update.component';
import { TaskMySuffixDeleteDialogComponent } from './task-my-suffix-delete-dialog.component';
import { taskRoute } from './task-my-suffix.route';

@NgModule({
  imports: [JhTestNsSharedModule, RouterModule.forChild(taskRoute)],
  declarations: [TaskMySuffixComponent, TaskMySuffixDetailComponent, TaskMySuffixUpdateComponent, TaskMySuffixDeleteDialogComponent],
  entryComponents: [TaskMySuffixDeleteDialogComponent],
})
export class JhTestNsTaskMySuffixModule {}
