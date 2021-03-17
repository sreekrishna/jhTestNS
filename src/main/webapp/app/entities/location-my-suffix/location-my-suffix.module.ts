import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhTestNsSharedModule } from 'app/shared/shared.module';
import { LocationMySuffixComponent } from './location-my-suffix.component';
import { LocationMySuffixDetailComponent } from './location-my-suffix-detail.component';
import { LocationMySuffixUpdateComponent } from './location-my-suffix-update.component';
import { LocationMySuffixDeleteDialogComponent } from './location-my-suffix-delete-dialog.component';
import { locationRoute } from './location-my-suffix.route';

@NgModule({
  imports: [JhTestNsSharedModule, RouterModule.forChild(locationRoute)],
  declarations: [
    LocationMySuffixComponent,
    LocationMySuffixDetailComponent,
    LocationMySuffixUpdateComponent,
    LocationMySuffixDeleteDialogComponent,
  ],
  entryComponents: [LocationMySuffixDeleteDialogComponent],
})
export class JhTestNsLocationMySuffixModule {}
