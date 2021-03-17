export interface ILocationMySuffix {
  id?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryId?: string;
}

export class LocationMySuffix implements ILocationMySuffix {
  constructor(
    public id?: string,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public countryId?: string
  ) {}
}
