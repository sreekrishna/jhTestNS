import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { DepartmentMySuffixDeleteDialogComponent } from './department-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-department-my-suffix',
  templateUrl: './department-my-suffix.component.html',
})
export class DepartmentMySuffixComponent implements OnInit, OnDestroy {
  departments?: IDepartmentMySuffix[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected departmentService: DepartmentMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.departmentService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IDepartmentMySuffix[]>) => (this.departments = res.body || []));
      return;
    }

    this.departmentService.query().subscribe((res: HttpResponse<IDepartmentMySuffix[]>) => (this.departments = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentMySuffix): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartments(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartmentMySuffix): void {
    const modalRef = this.modalService.open(DepartmentMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
