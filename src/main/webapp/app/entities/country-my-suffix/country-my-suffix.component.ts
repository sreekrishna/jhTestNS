import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from './country-my-suffix.service';
import { CountryMySuffixDeleteDialogComponent } from './country-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-country-my-suffix',
  templateUrl: './country-my-suffix.component.html',
})
export class CountryMySuffixComponent implements OnInit, OnDestroy {
  countries?: ICountryMySuffix[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected countryService: CountryMySuffixService,
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
      this.countryService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ICountryMySuffix[]>) => (this.countries = res.body || []));
      return;
    }

    this.countryService.query().subscribe((res: HttpResponse<ICountryMySuffix[]>) => (this.countries = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICountryMySuffix): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCountries(): void {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', () => this.loadAll());
  }

  delete(country: ICountryMySuffix): void {
    const modalRef = this.modalService.open(CountryMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
  }
}
