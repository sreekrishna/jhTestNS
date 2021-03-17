import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhTestNsSharedModule } from 'app/shared/shared.module';
import { RegionMySuffixComponent } from './region-my-suffix.component';
import { RegionMySuffixDetailComponent } from './region-my-suffix-detail.component';
import { RegionMySuffixUpdateComponent } from './region-my-suffix-update.component';
import { RegionMySuffixDeleteDialogComponent } from './region-my-suffix-delete-dialog.component';
import { regionRoute } from './region-my-suffix.route';

@NgModule({
  imports: [JhTestNsSharedModule, RouterModule.forChild(regionRoute)],
  declarations: [
    RegionMySuffixComponent,
    RegionMySuffixDetailComponent,
    RegionMySuffixUpdateComponent,
    RegionMySuffixDeleteDialogComponent,
  ],
  entryComponents: [RegionMySuffixDeleteDialogComponent],
})
export class JhTestNsRegionMySuffixModule {}
