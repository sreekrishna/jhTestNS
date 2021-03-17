import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhTestNsSharedModule } from 'app/shared/shared.module';
import { JobHistoryMySuffixComponent } from './job-history-my-suffix.component';
import { JobHistoryMySuffixDetailComponent } from './job-history-my-suffix-detail.component';
import { JobHistoryMySuffixUpdateComponent } from './job-history-my-suffix-update.component';
import { JobHistoryMySuffixDeleteDialogComponent } from './job-history-my-suffix-delete-dialog.component';
import { jobHistoryRoute } from './job-history-my-suffix.route';

@NgModule({
  imports: [JhTestNsSharedModule, RouterModule.forChild(jobHistoryRoute)],
  declarations: [
    JobHistoryMySuffixComponent,
    JobHistoryMySuffixDetailComponent,
    JobHistoryMySuffixUpdateComponent,
    JobHistoryMySuffixDeleteDialogComponent,
  ],
  entryComponents: [JobHistoryMySuffixDeleteDialogComponent],
})
export class JhTestNsJobHistoryMySuffixModule {}
