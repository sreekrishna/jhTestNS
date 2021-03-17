import { Moment } from 'moment';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';

export interface IEmployeeMySuffix {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  commissionPct?: number;
  jobs?: IJobMySuffix[];
  managerId?: string;
  departmentId?: string;
}

export class EmployeeMySuffix implements IEmployeeMySuffix {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public salary?: number,
    public commissionPct?: number,
    public jobs?: IJobMySuffix[],
    public managerId?: string,
    public departmentId?: string
  ) {}
}
