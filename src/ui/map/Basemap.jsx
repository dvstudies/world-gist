import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { MapContainer, TileLayer, Pane } from "react-leaflet";

import { useStore } from "../../store/useStore";

import Dots from "./Dots";

export default function Basemap({ theme }) {
    const { cities } = useStore();

    const bounds = [
        [-90, -180],
        [90, 180],
    ];
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <MapContainer
                zoom={10}
                bounds={bounds}
                maxBounds={bounds}
                maxZoom={18}
                minZoom={1}
                zoomControl={false}
                // ref={mapRef}
                // use EPSG:4326 CRS
                // crs={L.CRS.EPSG4326}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    backgroundColor: theme.colors.elevation2,
                }}
            >
                <Pane
                    name="basemap"
                    style={{
                        zIndex: 0,
                    }}
                >
                    <TileLayer
                        url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    />
                </Pane>

                <Pane
                    name="markers"
                    style={{ zIndex: 600 }}
                >
                    <Dots cities={cities} />
                </Pane>
            </MapContainer>
        </div>
    );
}
