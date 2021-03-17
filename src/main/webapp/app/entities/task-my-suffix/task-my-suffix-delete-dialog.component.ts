import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';

@Component({
  templateUrl: './task-my-suffix-delete-dialog.component.html',
})
export class TaskMySuffixDeleteDialogComponent {
  task?: ITaskMySuffix;

  constructor(protected taskService: TaskMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.taskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taskListModification');
      this.activeModal.close();
    });
  }
}
