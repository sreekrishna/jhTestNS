import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { DepartmentMySuffixDetailComponent } from 'app/entities/department-my-suffix/department-my-suffix-detail.component';
import { DepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';

describe('Component Tests', () => {
  describe('DepartmentMySuffix Management Detail Component', () => {
    let comp: DepartmentMySuffixDetailComponent;
    let fixture: ComponentFixture<DepartmentMySuffixDetailComponent>;
    const route = ({ data: of({ department: new DepartmentMySuffix('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [DepartmentMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DepartmentMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load department on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.department).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
