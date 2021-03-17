import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/location-my-suffix.service';
import { ILocationMySuffix, LocationMySuffix } from 'app/shared/model/location-my-suffix.model';

describe('Service Tests', () => {
  describe('LocationMySuffix Service', () => {
    let injector: TestBed;
    let service: LocationMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocationMySuffix;
    let expectedResult: ILocationMySuffix | ILocationMySuffix[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LocationMySuffixService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new LocationMySuffix('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LocationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LocationMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LocationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            streetAddress: 'BBBBBB',
            postalCode: 'BBBBBB',
            city: 'BBBBBB',
            stateProvince: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LocationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            streetAddress: 'BBBBBB',
            postalCode: 'BBBBBB',
            city: 'BBBBBB',
            stateProvince: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a LocationMySuffix', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
