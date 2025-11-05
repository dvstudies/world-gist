import {
    MapContainer,
    TileLayer,
    Pane,
    CircleMarker,
    useMapEvents,
} from "react-leaflet";

export default function Dots({ cities }) {
    const color = "white";

    return (
        <>
            {cities.map((city, index) => (
                <CircleMarker
                    key={index}
                    center={[city.latitude, city.longitude]}
                    radius={0}
                    color={color}
                    fillColor={color}
                    fillOpacity={1}
                    strokeWidth={0}
                    style={{ boxShadow: "0 0 5px rgba(0,0,0,1)" }}
                />
            ))}
        </>
    );
}
