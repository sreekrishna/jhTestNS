import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { RegionMySuffixDetailComponent } from 'app/entities/region-my-suffix/region-my-suffix-detail.component';
import { RegionMySuffix } from 'app/shared/model/region-my-suffix.model';

describe('Component Tests', () => {
  describe('RegionMySuffix Management Detail Component', () => {
    let comp: RegionMySuffixDetailComponent;
    let fixture: ComponentFixture<RegionMySuffixDetailComponent>;
    const route = ({ data: of({ region: new RegionMySuffix('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [RegionMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RegionMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegionMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load region on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.region).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
