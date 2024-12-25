export interface MostDeadliest {
    _id: string,
    casualties: number
}
export interface gangsByRegion {
    gang: string,
    casualties: number
}

export interface HighestCasualties {
    latitude: string | any;
    longitude: string | any;
    avgCasualties: number;
}

export interface incidentsTrends {
    year: number | any,
    month: number | any
    incidentCount: number
}
export interface IncidentsByYearOrGang{
    name:string,
    incidents: string
}