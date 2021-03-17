import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from './country-my-suffix.service';

@Component({
  templateUrl: './country-my-suffix-delete-dialog.component.html',
})
export class CountryMySuffixDeleteDialogComponent {
  country?: ICountryMySuffix;

  constructor(
    protected countryService: CountryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.countryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('countryListModification');
      this.activeModal.close();
    });
  }
}
