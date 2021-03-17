export interface IRegionMySuffix {
  id?: string;
  regionName?: string;
}

export class RegionMySuffix implements IRegionMySuffix {
  constructor(public id?: string, public regionName?: string) {}
}
