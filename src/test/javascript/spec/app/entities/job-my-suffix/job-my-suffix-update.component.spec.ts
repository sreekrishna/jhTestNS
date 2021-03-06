import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { JobMySuffixUpdateComponent } from 'app/entities/job-my-suffix/job-my-suffix-update.component';
import { JobMySuffixService } from 'app/entities/job-my-suffix/job-my-suffix.service';
import { JobMySuffix } from 'app/shared/model/job-my-suffix.model';

describe('Component Tests', () => {
  describe('JobMySuffix Management Update Component', () => {
    let comp: JobMySuffixUpdateComponent;
    let fixture: ComponentFixture<JobMySuffixUpdateComponent>;
    let service: JobMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [JobMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(JobMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobMySuffix('123');
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
        const entity = new JobMySuffix();
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
