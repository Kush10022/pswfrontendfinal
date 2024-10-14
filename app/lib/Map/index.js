import React, { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const SmallMap = ({
  location = { latitude, longitude },
  zoom = 20,
  extraTailwindCSSClass,
}) => {
  // If there is no location, we return null
  if (!location) return null;

  const { latitude, longitude } = location;

  // If no latitude or longitude, we return null
  if (!latitude || !longitude) return null;

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

const calculateCenter = (psws) => {
  const latitudes = psws.map(psw => psw.latitude);
  const longitudes = psws.map(psw => psw.longitude);
  
  const avgLatitude = latitudes.reduce((a, b) => a + b) / latitudes.length;
  const avgLongitude = longitudes.reduce((a, b) => a + b) / longitudes.length;
  
  return [avgLatitude, avgLongitude];
};

// function MultiMarkerMap({ psws = [], zoom = 11 }) {
//   let center = [];

//   if (psws.length === 1 ) {
//     center = [psws[0].latitude, psws[0].longitude];
//   }
//   else {
//     center = calculateCenter(psws);
//   }

//   return (
//     <MapContainer
//       center={center}
//       zoom={zoom}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <ChangeView center={center} zoom={zoom} />
//       <TileLayer
//         url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
//       />
//       {psws.map((psw) => (
//         <Marker key={psw.id} position={[psw.latitude, psw.longitude]}>
//           <Popup>
//             <div>
//               <h1 className="text-lg font-bold">{psw.name}</h1>
//               <p>{psw.description}</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

const MultiMarkerMap = ({psws}) => {
  const [center] = useState(calculateCenter(psws)); // Calculate initial center
  const [zoom, setZoom] = useState(13); // Initial zoom level

  // Function to change zoom if necessary
  const changeZoom = (newZoom) => {
    setZoom(newZoom);
  };

  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
      />

      {/* Use ChangeView to adjust center and zoom */}
      <ChangeView center={center} zoom={zoom} />

      {/* Example to trigger zoom change, this can be any button or event */}
      <button onClick={() => changeZoom(10)} className="absolute z-50 p-2 bg-white">
        Zoom Out
      </button>

      {/* Markers for PSWs */}
      {psws.map((psw) => (
        <Marker key={psw.id} position={[psw.latitude, psw.longitude]}>
          <Popup>
            <strong>{psw.name}</strong><br />
            {psw.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export { SmallMap, MultiMarkerMap };
