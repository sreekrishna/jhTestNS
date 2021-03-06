import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { JobHistoryMySuffixUpdateComponent } from 'app/entities/job-history-my-suffix/job-history-my-suffix-update.component';
import { JobHistoryMySuffixService } from 'app/entities/job-history-my-suffix/job-history-my-suffix.service';
import { JobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Update Component', () => {
    let comp: JobHistoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<JobHistoryMySuffixUpdateComponent>;
    let service: JobHistoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [JobHistoryMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(JobHistoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobHistoryMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobHistoryMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobHistoryMySuffix('123');
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
        const entity = new JobHistoryMySuffix();
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
