import "leaflet/dist/leaflet.css";
import "@/map/map.css";
import * as L from "leaflet";

import { MapContainer, TileLayer, Pane } from "react-leaflet";

import { useStore } from "@/store/useStore";

import Dots from "./Dots";
import { useEffect, useMemo, useRef } from "react";

export default function Basemap() {
    const cities = useStore((s) => s.cities);
    const search = useStore((s) => s.search);
    const mapRef = useRef();

    const bounds = [
        [-80, -180],
        [90, 180],
    ];

    const center = useMemo(() => {
        if (!search) return null;
        return { latitude: search.latitude, longitude: search.longitude };
    }, [search]);

    // useEffect(() => {
    //     if (center) {
    //         const map = mapRef.current;

    //         map.flyTo([center.latitude, center.longitude], 7, {
    //             animate: true,
    //             duration: 1.5,
    //         });
    //     }
    // }, [center]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <MapContainer
                ref={mapRef}
                zoom={3}
                center={[20, 0]}
                // bounds={bounds}
                maxBounds={bounds}
                maxZoom={18}
                minZoom={2}
                zoomControl={false}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                }}
            >
                <Pane
                    name="basemap"
                    style={{
                        zIndex: 0,
                    }}
                >
                    <TileLayer
                        // url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                        url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
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
