import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from './job-my-suffix.service';

@Component({
  templateUrl: './job-my-suffix-delete-dialog.component.html',
})
export class JobMySuffixDeleteDialogComponent {
  job?: IJobMySuffix;

  constructor(protected jobService: JobMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.jobService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobListModification');
      this.activeModal.close();
    });
  }
}
