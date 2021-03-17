import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/employee-my-suffix.service';
import { IEmployeeMySuffix, EmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

describe('Service Tests', () => {
  describe('EmployeeMySuffix Service', () => {
    let injector: TestBed;
    let service: EmployeeMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmployeeMySuffix;
    let expectedResult: IEmployeeMySuffix | IEmployeeMySuffix[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EmployeeMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EmployeeMySuffix('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            hireDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EmployeeMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            hireDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.create(new EmployeeMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EmployeeMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            salary: 1,
            commissionPct: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EmployeeMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            salary: 1,
            commissionPct: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EmployeeMySuffix', () => {
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
