import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhTestNsTestModule } from '../../../test.module';
import { RegionMySuffixUpdateComponent } from 'app/entities/region-my-suffix/region-my-suffix-update.component';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/region-my-suffix.service';
import { RegionMySuffix } from 'app/shared/model/region-my-suffix.model';

describe('Component Tests', () => {
  describe('RegionMySuffix Management Update Component', () => {
    let comp: RegionMySuffixUpdateComponent;
    let fixture: ComponentFixture<RegionMySuffixUpdateComponent>;
    let service: RegionMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhTestNsTestModule],
        declarations: [RegionMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RegionMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegionMySuffix('123');
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
        const entity = new RegionMySuffix();
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
