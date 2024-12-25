import React, { useEffect, useState } from 'react'
import SortBar from '../component/incidentTrends/SortBar'
import Graph from '../component/incidentTrends/Graph'
import { useThreatsContext } from '../service/context';
import { Dataset } from '../types/serviceTypes';

export const IncidentsTrends = () => {
  const { incidentsTrends } = useThreatsContext();
  const [data, setData] = useState<Dataset[]>([]);

  useEffect(() => {
    if (incidentsTrends && incidentsTrends.length > 0) {
      const mappedData = incidentsTrends.map((inc) => {
        if (inc && inc.incidentCount) {
          if (inc.month && inc.month>0) {           
            return { incidents: inc.incidentCount, period: inc.month.toString() };
          } else if (inc.year) {
            return { incidents: inc.incidentCount, period: inc.year.toString() };
          }
        }
        return null;
      }).filter((inc) => inc !== null);

      if (mappedData.length > 0) {
        setData(mappedData);
      }
    }
  }, [incidentsTrends]);

  return (
    <>
      <SortBar />
      <Graph dataset={data} />
    </>
  );
}
