import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { JhTestNsTestModule } from '../../../test.module';
import { JobHistoryMySuffixComponent } from 'app/entities/job-history-my-suffix/job-history-my-suffix.component';
import { JobHistoryMySuffixService } from 'app/entities/job-history-my-suffix/job-history-my-suffix.service';
import { JobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Component', () => {
    let comp: JobHistoryMySuffixComponent;
    let fixture: ComponentFixture<JobHistoryMySuffixComponent>;
    let service: JobHistoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [JobHistoryMySuffixComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(JobHistoryMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobHistoryMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobHistoryMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new JobHistoryMySuffix('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.jobHistories && comp.jobHistories[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new JobHistoryMySuffix('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.jobHistories && comp.jobHistories[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should re-initialize the page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new JobHistoryMySuffix('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);
      comp.reset();

      // THEN
      expect(comp.page).toEqual(0);
      expect(service.query).toHaveBeenCalledTimes(2);
      expect(comp.jobHistories && comp.jobHistories[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
  });
});
