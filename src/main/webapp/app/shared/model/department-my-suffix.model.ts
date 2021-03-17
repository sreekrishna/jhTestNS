import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

export interface IDepartmentMySuffix {
  id?: string;
  departmentName?: string;
  locationId?: string;
  employees?: IEmployeeMySuffix[];
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
  constructor(public id?: string, public departmentName?: string, public locationId?: string, public employees?: IEmployeeMySuffix[]) {}
}
