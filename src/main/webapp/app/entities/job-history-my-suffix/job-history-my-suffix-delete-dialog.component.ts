import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';

@Component({
  templateUrl: './job-history-my-suffix-delete-dialog.component.html',
})
export class JobHistoryMySuffixDeleteDialogComponent {
  jobHistory?: IJobHistoryMySuffix;

  constructor(
    protected jobHistoryService: JobHistoryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobHistoryListModification');
      this.activeModal.close();
    });
  }
}
