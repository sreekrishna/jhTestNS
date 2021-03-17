import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';

export interface ITaskMySuffix {
  id?: string;
  title?: string;
  description?: string;
  jobs?: IJobMySuffix[];
}

export class TaskMySuffix implements ITaskMySuffix {
  constructor(public id?: string, public title?: string, public description?: string, public jobs?: IJobMySuffix[]) {}
}
