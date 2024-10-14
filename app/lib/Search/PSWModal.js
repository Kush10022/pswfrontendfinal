import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure you have this imported
import toast, { Toaster } from 'react-hot-toast'; // Importing react-hot-toast

export default function PSWModal({ psw, onClose }) {
    // console.log(psw);
    // console.log(psw.address.location.coordinates[0]);

    // Function to handle booking
    const handleBooking = () => {
        toast.success('Booking confirmed!');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Toaster container to display the toast */}
            <Toaster />

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    Close
                </button>

                {/* Map Section */}
                <div className="w-1/2 h-96 pr-4">
                    <MapContainer
                        center={[psw.address.location.coordinates[0], psw.address.location.coordinates[1]]}
                        zoom={11} // Zoomed out for a clearer view
                        style={{ height: "100%", width: "100%" }} // Make the map responsive
                        className="rounded-lg shadow-lg"
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
                        />
                        <Marker position={[psw.address.location.coordinates[0], psw.address.location.coordinates[1]]}>
                            <Popup>
                                <strong>{psw.name}</strong><br />
                                {psw.address.address}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {/* PSW Details Section */}
                <div className="w-1/2 flex flex-col items-center space-y-4">
                    {/* Profile Picture */}
                    <img
                        src={psw.profilePicture}
                        alt={psw.name}
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />

                    {/* PSW Name and Rate */}
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">{psw.name}</h2>
                        <p className="text-green-600 font-bold text-lg">${psw.rate}/hr</p>
                        <p className="text-blue-600 mt-2">{psw.email}</p>
                    </div>

                    {/* PSW Address */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">{psw.address.address}</p>
                    </div>

                    {/* Book Now Button */}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 mt-4"
                        onClick={handleBooking} // Show toaster on click
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
