export interface ILocationDectectionResponse {
  is_in_european_union: boolean;
  longitude: number;
  city: string;
  timezone: string;
  asn: number;
  offset: number;
  region: string;
  latitude: number;
  organization: string;
  country_code: string;
  ip: string;
  country_code3: string;
  continent_code: string;
  country: string;
  country_name?: string;
  region_name?: string;
  region_code?: string;
}
