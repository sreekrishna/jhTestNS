import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { LocationMySuffixDetailComponent } from 'app/entities/location-my-suffix/location-my-suffix-detail.component';
import { LocationMySuffix } from 'app/shared/model/location-my-suffix.model';

describe('Component Tests', () => {
  describe('LocationMySuffix Management Detail Component', () => {
    let comp: LocationMySuffixDetailComponent;
    let fixture: ComponentFixture<LocationMySuffixDetailComponent>;
    const route = ({ data: of({ location: new LocationMySuffix('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [LocationMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocationMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocationMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load location on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.location).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
