import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SmallMap = ({ location = { latitude, longitude }, zoom = 20 , extraTailwindCSSClass}) => {
  // If there is no location, we return null
  if (!location) return null;

  const { latitude, longitude } = location;

  // If no latitude or longitude, we return null
  if (!latitude || !longitude) return null;

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className={`${extraTailwindCSSClass}`}
    >
      <ChangeView center={[latitude, longitude]} zoom={zoom} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
};

export { SmallMap };