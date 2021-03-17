import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { JobMySuffixDetailComponent } from 'app/entities/job-my-suffix/job-my-suffix-detail.component';
import { JobMySuffix } from 'app/shared/model/job-my-suffix.model';

describe('Component Tests', () => {
  describe('JobMySuffix Management Detail Component', () => {
    let comp: JobMySuffixDetailComponent;
    let fixture: ComponentFixture<JobMySuffixDetailComponent>;
    const route = ({ data: of({ job: new JobMySuffix('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [JobMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(JobMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load job on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.job).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
