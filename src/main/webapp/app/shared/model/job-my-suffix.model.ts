import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';

export interface IJobMySuffix {
  id?: string;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  tasks?: ITaskMySuffix[];
  employeeId?: string;
}

export class JobMySuffix implements IJobMySuffix {
  constructor(
    public id?: string,
    public jobTitle?: string,
    public minSalary?: number,
    public maxSalary?: number,
    public tasks?: ITaskMySuffix[],
    public employeeId?: string
  ) {}
}
