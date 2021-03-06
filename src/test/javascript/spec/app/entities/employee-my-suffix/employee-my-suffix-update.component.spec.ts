import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { EmployeeMySuffixUpdateComponent } from 'app/entities/employee-my-suffix/employee-my-suffix-update.component';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/employee-my-suffix.service';
import { EmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

describe('Component Tests', () => {
  describe('EmployeeMySuffix Management Update Component', () => {
    let comp: EmployeeMySuffixUpdateComponent;
    let fixture: ComponentFixture<EmployeeMySuffixUpdateComponent>;
    let service: EmployeeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [EmployeeMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EmployeeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeMySuffix('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
