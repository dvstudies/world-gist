import Search from "./composed/Search";
import ImgViewer from "./composed/ImgViewer";
import MapView from "./composed/MapView";
import Basemap from "@/map/Basemap";

export default function Layout() {
    const margin = 30;
    const mapW = 450;

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: margin,
                    left: margin,
                    zIndex: 100,
                    width: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <Search />
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: margin,
                    left: margin,
                    zIndex: 100,
                }}
            >
                <MapView maxWidth={mapW * 1.5} />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: margin,
                    right: margin,
                    zIndex: 100,
                    width: `${mapW}px`,
                }}
            >
                <ImgViewer width={mapW} />
            </div>
        </>
    );
}
