export interface Markers {
    lat: number | any;
    lng: number | any;
    popup: string | any;
  }

  export interface Dataset {
    period: string | number;
    incidents: number;     
  }

  export interface CountryRegion{
    country: string;
    region: string;
  };