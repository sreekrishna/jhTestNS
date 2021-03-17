import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { CountryMySuffixDetailComponent } from 'app/entities/country-my-suffix/country-my-suffix-detail.component';
import { CountryMySuffix } from 'app/shared/model/country-my-suffix.model';

describe('Component Tests', () => {
  describe('CountryMySuffix Management Detail Component', () => {
    let comp: CountryMySuffixDetailComponent;
    let fixture: ComponentFixture<CountryMySuffixDetailComponent>;
    const route = ({ data: of({ country: new CountryMySuffix('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [CountryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CountryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load country on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.country).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
