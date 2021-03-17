import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhTestNsSharedModule } from 'app/shared/shared.module';
import { CountryMySuffixComponent } from './country-my-suffix.component';
import { CountryMySuffixDetailComponent } from './country-my-suffix-detail.component';
import { CountryMySuffixUpdateComponent } from './country-my-suffix-update.component';
import { CountryMySuffixDeleteDialogComponent } from './country-my-suffix-delete-dialog.component';
import { countryRoute } from './country-my-suffix.route';

@NgModule({
  imports: [JhTestNsSharedModule, RouterModule.forChild(countryRoute)],
  declarations: [
    CountryMySuffixComponent,
    CountryMySuffixDetailComponent,
    CountryMySuffixUpdateComponent,
    CountryMySuffixDeleteDialogComponent,
  ],
  entryComponents: [CountryMySuffixDeleteDialogComponent],
})
export class JhTestNsCountryMySuffixModule {}
