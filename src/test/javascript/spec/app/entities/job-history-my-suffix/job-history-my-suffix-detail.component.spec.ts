import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { JobHistoryMySuffixDetailComponent } from 'app/entities/job-history-my-suffix/job-history-my-suffix-detail.component';
import { JobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Detail Component', () => {
    let comp: JobHistoryMySuffixDetailComponent;
    let fixture: ComponentFixture<JobHistoryMySuffixDetailComponent>;
    const route = ({ data: of({ jobHistory: new JobHistoryMySuffix('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [JobHistoryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(JobHistoryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobHistoryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load jobHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
