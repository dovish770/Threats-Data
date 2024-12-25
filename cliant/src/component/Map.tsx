import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Markers } from '../types/serviceTypes';

interface MapComponentProps {
    markers: Markers[] | [];
    center: [number, number];
    mapRef: React.RefObject<any>;
}

const MapComponent: React.FC<MapComponentProps> = ({ markers, center, mapRef }) => {
    return (
        <MapContainer
            ref={mapRef}
            center={center}
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

            {markers && markers.map((mark, idx) => (
                <Marker key={idx} position={[mark.lat, mark.lng]}>
                    <Popup>
                         {mark.popup}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
