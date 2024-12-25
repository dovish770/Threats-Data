import React, { useEffect, useState, useRef } from 'react';
import SortBar from '../component/HiestAgCasualties/SortBar';
import { useThreatsContext } from '../service/context';
import MapComponent from '../component/Map';
import { Markers } from '../types/serviceTypes';

const CasualtiesByRegion = () => {
  const { highestAvgCasualtiesRegion } = useThreatsContext();
  const [markers, setMarkers] = useState<Markers[] | []>([]);
  const [center, setCenter] = useState<[number, number]>([32.0853, 34.7818]);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (highestAvgCasualtiesRegion && highestAvgCasualtiesRegion.length > 0) {
      const newMarkers = highestAvgCasualtiesRegion.map((att) => {
        if (att && att.latitude && att.longitude && att.avgCasualties) {
          return {
            lat: parseFloat(att.latitude),
            lng: parseFloat(att.longitude),
            popup: `Average casualties: ${att.avgCasualties}`,
          };
        }
        return null;
      }).filter((mark) => mark !== null);
      if (newMarkers.length > 0) {
        setMarkers(newMarkers);
      }

      if (newMarkers.length > 0) {
        setCenter([newMarkers[0].lat, newMarkers[0].lng]);
      }
    }
  }, [highestAvgCasualtiesRegion]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, 13);
    }
  }, [center]);

  return (
    <div>
      <SortBar />
      <MapComponent markers={markers} center={center} mapRef={mapRef} />
    </div>
  );
};

export default CasualtiesByRegion;
