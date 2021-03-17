import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { TaskMySuffixDeleteDialogComponent } from './task-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-task-my-suffix',
  templateUrl: './task-my-suffix.component.html',
})
export class TaskMySuffixComponent implements OnInit, OnDestroy {
  tasks?: ITaskMySuffix[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected taskService: TaskMySuffixService,
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
      this.taskService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ITaskMySuffix[]>) => (this.tasks = res.body || []));
      return;
    }

    this.taskService.query().subscribe((res: HttpResponse<ITaskMySuffix[]>) => (this.tasks = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTasks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaskMySuffix): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTasks(): void {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', () => this.loadAll());
  }

  delete(task: ITaskMySuffix): void {
    const modalRef = this.modalService.open(TaskMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
  }
}
