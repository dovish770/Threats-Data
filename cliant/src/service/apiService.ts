import axios from "../service/axiosConfig";
import { gangsByRegion, HighestCasualties, IncidentsByYearOrGang, incidentsTrends, MostDeadliest } from "../types/serverTypes";
const URL = import.meta.env.SERVER_URL
export const fetchMostDeadliestService = async (): Promise<MostDeadliest[]> => {
  try {
    const response: any = await axios.get(URL+"/api/analysis/deadliest-attack-types");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const fetchHighestAvgCasualtiesService = async (region: string, isAllRegion: string): Promise<HighestCasualties[]> => {
  try {
    const response = await fetch(URL+`/api/analysis/highest-casualty-regions?region=${region}&isAllRegion=${isAllRegion}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    if (isAllRegion === 'true') {
      if (Array.isArray(data)) {
        return data.map(item => ({
          latitude: item.latitude,
          longitude: item.longitude,
          avgCasualties: item.avgCasualties,
        }));
      } else {
        throw new Error("Data format for all regions is incorrect");
      }
    } else {
      if (data && data.latitude && data.longitude && data.avgCasualties) {
        return [{
          latitude: data.latitude,
          longitude: data.longitude,
          avgCasualties: data.avgCasualties,
        }];
      } else {
        throw new Error("Data format for single region is incorrect");
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchIncidentsTrendsService = async (startYear: string, endYear: string): Promise<incidentsTrends[]> => {
  try {
    const response = await fetch(URL+`/api/analysis/incident-trends?startYear=${startYear}&endYear=${endYear}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("error response!");
    }

    return data.map(item => ({
      year: item.year,
      month: item.month,
      incidentCount: item.incidentCount
    }));

  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const fetchGangsByRegionService = async (region: string, top: string): Promise<gangsByRegion[]> => {
  try {
    const response = await fetch(URL+`/api/relationships/top-groups?region=${encodeURIComponent(region)}&top=${top}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("error response!");
    }

    return data.map(item => ({
      gang: item._id,
      casualties: item.casualties
    }));

  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchListOfTypeService = async (type: string): Promise<string[]> => {
  try {
    const response = await fetch(URL+`/api/list-of-types/?type=${type}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("error response!");
    }
    
    return data.map(item => (
      item._id
    ));

  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchGroupByYearOrGangService = async (year?: string, gang?: string):  Promise<IncidentsByYearOrGang[]> => {

  try {
    let url = URL+'/api/relationships/groups-by-year?';
    if (year) {
      url += `year=${year}`;
    } else if (gang) {
      url += `gang=${gang}`;
    }

    const response = await fetch(url);
    console.log(year, gang);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("error response!");
    }
    
    return data.map(item => ({
      name: item._id,
      incidents: item.incidents
    })
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

