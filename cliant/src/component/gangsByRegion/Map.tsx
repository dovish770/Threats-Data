import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import { useThreatsContext } from '../../service/context';

const Map = () => {
    const { getRegionByCountry, setError,fetchGangsByRegion } = useThreatsContext();

    const [position, setPosition] = useState<[number, number]>([0.345, 5.456]);
    const [region, setRegion] = useState<string>(''); 
    const getCountry = async (lat: number, lng: number) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        if (data && data.address && data.address.country ) {
            const newRegion = getRegionByCountry(data.address.country)
            if(newRegion)
            setRegion(newRegion); 
        } else {
            setError('location is Irrelevant!')
        }
    };

    const handleApiCall = async () => {
        if (region) {
            await fetchGangsByRegion(region, "5")
        }
    };

    const MapEvents = () => {
        useMapEvents({
            dblclick: (e) => {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                getCountry(lat, lng); 
            },
        });
        return null;
    };

    return (
        <MapContainer
            center={position}
            zoom={1}
            minZoom={1}
            maxZoom={10}
            style={{
                width: '80%',
                height: '50vh',
                border: '2px solid gray',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
            <Marker position={position} icon={new L.Icon({
                    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                })}>
                <Popup>
                    <span>Selected Location</span><br />
                    <strong>Country:</strong> {region || 'not valid mark'}<br />
                    <button onClick={handleApiCall}>show gangs</button>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
