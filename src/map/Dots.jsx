import {
    MapContainer,
    TileLayer,
    Pane,
    CircleMarker,
    Circle,
    useMapEvents,
    Marker,
} from "react-leaflet";

import { useStore } from "@/store/useStore";

export default function Dots({ cities }) {
    const labelledData = useStore((s) => s.labelledData);
    const color = "blue";
    const timestep = useStore((s) => s.timestep);
    const umap = useStore((s) => s.umap);
    const clusterData = useStore((s) => s.clusterData);

    const dotIcon = (color) =>
        L.divIcon({
            className: "city-dot",
            html: `<div class="dot" style="background:${
                color || "gray"
            }"></div>`,
        });

    return (
        <>
            {cities &&
                cities.map((city, index) => (
                    <Marker
                        key={index}
                        position={[city.latitude, city.longitude]}
                        icon={dotIcon(
                            labelledData.find((c) => c.geoid === city.geoid)
                                ?.color
                        )}
                    />
                ))}
        </>
    );
}
