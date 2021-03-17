export interface ICountryMySuffix {
  id?: string;
  countryName?: string;
  regionId?: string;
}

export class CountryMySuffix implements ICountryMySuffix {
  constructor(public id?: string, public countryName?: string, public regionId?: string) {}
}
