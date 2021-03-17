import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhTestNsTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { JobHistoryMySuffixDeleteDialogComponent } from 'app/entities/job-history-my-suffix/job-history-my-suffix-delete-dialog.component';
import { JobHistoryMySuffixService } from 'app/entities/job-history-my-suffix/job-history-my-suffix.service';

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Delete Component', () => {
    let comp: JobHistoryMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<JobHistoryMySuffixDeleteDialogComponent>;
    let service: JobHistoryMySuffixService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [JobHistoryMySuffixDeleteDialogComponent],
      })
        .overrideTemplate(JobHistoryMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobHistoryMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobHistoryMySuffixService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
