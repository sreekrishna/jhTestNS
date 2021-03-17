import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';

@Component({
  templateUrl: './department-my-suffix-delete-dialog.component.html',
})
export class DepartmentMySuffixDeleteDialogComponent {
  department?: IDepartmentMySuffix;

  constructor(
    protected departmentService: DepartmentMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.departmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentListModification');
      this.activeModal.close();
    });
  }
}
