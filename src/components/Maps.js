import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position = [51.505, -0.09]
const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38, 38],
});

const mapType = ["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"]
const Maps = () => {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <MapContainer
                center={position}
                zoom={8}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url={mapType[0]} />
                <Marker position={position} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Maps