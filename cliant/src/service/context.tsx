import React, { createContext, useState, useContext, ReactNode } from "react";
import { fetchGangsByRegionService, fetchGroupByYearOrGangService, fetchHighestAvgCasualtiesService, fetchIncidentsTrendsService, fetchListOfTypeService, fetchMostDeadliestService } from "./apiService";
import { gangsByRegion, HighestCasualties, IncidentsByYearOrGang, incidentsTrends, MostDeadliest } from "../types/serverTypes";
import countriesWithRegions from "../assets/regionData";

interface ThreatsContextType {
  mostDeadliest: MostDeadliest[];
  highestAvgCasualtiesRegion: HighestCasualties[];
  incidentsTrends: incidentsTrends[];
  gangsByRegion: gangsByRegion[]
  listOfTypes: string[]
  incidentsByYearOrGang: IncidentsByYearOrGang[]
  loading: boolean;
  error: string | null;
  fetchMostDeadliest: () => Promise<void>;
  fetchHighestAvgCasualties: (region: string, isAllRegion: string) => Promise<void>;
  fetchIncidentsTrends: (startYear: string, endYear: string) => Promise<void>;
  fetchGangsByRegion: (region: string, top: string) => Promise<void>;
  getRegionByCountry: (country: string) => string | null;
  fetchGroupByYearOrGang: (year?: string, gang?: string) => Promise<void>;
  fetchListOfType: (type: string) => void
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

interface ThreatsProviderProps {
  children: ReactNode;
}

const ThreatsContext = createContext<ThreatsContextType | undefined>(undefined);

export const useThreatsContext = () => {
  const context = useContext(ThreatsContext);
  if (!context) {
    throw new Error("useThreatsContext must be used within a ThreatsProvider");
  }
  return context;
};

export const ThreatsProvider: React.FC<ThreatsProviderProps> = ({ children }) => {
  const [mostDeadliest, setMostDeadliest] = useState<MostDeadliest[]>([]);
  const [highestAvgCasualtiesRegion, setHighestAvgCasualtiesRegion] = useState<HighestCasualties[]>([]);
  const [incidentsTrends, setIncidentsTrends] = useState<incidentsTrends[]>([]);
  const [gangsByRegion, setGangsByRegion] = useState<gangsByRegion[]>([]);
  const [incidentsByYearOrGang, setIncidentsByYearOrGang] = useState<IncidentsByYearOrGang[]>([]);
  const [listOfTypes, setListOfTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMostDeadliest = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMostDeadliestService();
      setMostDeadliest(data);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const fetchHighestAvgCasualties = async (region: string, isAllRegion: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHighestAvgCasualtiesService(region, isAllRegion);
      setHighestAvgCasualtiesRegion(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidentsTrends = async (year: string, month: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIncidentsTrendsService(year, month);
      setIncidentsTrends(data);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGangsByRegion = async (region: string, top: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGangsByRegionService(region, top);
      setGangsByRegion(data);
      console.log(data);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchListOfType = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchListOfTypeService(type);
      setListOfTypes(data);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupByYearOrGang = async (year?: string, gang?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGroupByYearOrGangService(year, gang);
      setIncidentsByYearOrGang(data);
      console.log(data);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  function getRegionByCountry(countryName: string): string | null {
    const countryData = countriesWithRegions.find(
      (entry) => entry.country.toLowerCase() === countryName.toLowerCase()
    );

    if (countryData) {
      return countryData.region;
    } else {
      return null;
    }

  }
  return (
    <ThreatsContext.Provider value={{
      mostDeadliest, highestAvgCasualtiesRegion, incidentsTrends, incidentsByYearOrGang, gangsByRegion, listOfTypes, loading, error,
      setError, setLoading,
      fetchMostDeadliest, fetchHighestAvgCasualties, fetchIncidentsTrends, fetchGangsByRegion, getRegionByCountry, fetchGroupByYearOrGang, fetchListOfType
    }}>
      {children}
    </ThreatsContext.Provider>
  );
};
