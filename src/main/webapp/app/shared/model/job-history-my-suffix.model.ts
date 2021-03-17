import { Moment } from 'moment';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IJobHistoryMySuffix {
  id?: string;
  startDate?: Moment;
  endDate?: Moment;
  language?: Language;
  jobId?: string;
  departmentId?: string;
  employeeId?: string;
}

export class JobHistoryMySuffix implements IJobHistoryMySuffix {
  constructor(
    public id?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public language?: Language,
    public jobId?: string,
    public departmentId?: string,
    public employeeId?: string
  ) {}
}
