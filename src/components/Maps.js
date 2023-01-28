import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position = [42.361145, -71.057083]
const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38, 38],
});

const mapType = ["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"]

const ResetCenterView = (props) => {
    const { selectedPosition } = props;
    const map = useMap();

    useEffect(() => {
        if (selectedPosition) {
            map.setView(
                L.latLng(selectedPosition?.lat, selectedPosition?.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    }, [selectedPosition]);

    return null;
}

const Maps = (props) => {
    const { selectedPosition } = props
    const markerPosition = [selectedPosition?.lat ?? position[0], selectedPosition?.lon ?? position[1]]
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <MapContainer
                center={position}
                zoom={12}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url={mapType[0]} />
                <Marker position={markerPosition} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <ResetCenterView selectedPosition={selectedPosition} />

            </MapContainer>
        </div>
    )
}

export default Maps