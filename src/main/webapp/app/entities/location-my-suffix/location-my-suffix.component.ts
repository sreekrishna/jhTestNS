import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { LocationMySuffixDeleteDialogComponent } from './location-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-location-my-suffix',
  templateUrl: './location-my-suffix.component.html',
})
export class LocationMySuffixComponent implements OnInit, OnDestroy {
  locations?: ILocationMySuffix[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected locationService: LocationMySuffixService,
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
      this.locationService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ILocationMySuffix[]>) => (this.locations = res.body || []));
      return;
    }

    this.locationService.query().subscribe((res: HttpResponse<ILocationMySuffix[]>) => (this.locations = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocationMySuffix): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }

  delete(location: ILocationMySuffix): void {
    const modalRef = this.modalService.open(LocationMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }
}
