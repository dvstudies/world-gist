// import { levaStore, useControls, LevaPanel } from "leva";

// import { useStore } from "../store/useStore";

// export default function Layout() {
//     const cities = useStore((state) => state.cities);

//     const search = useControls(
//         "searchBar",
//         {
//             city: {
//                 options: cities.map((city) => city.asciiname) || [],
//                 value: "",
//             },
//         },
//         [cities]
//     );
//     return <></>;
// }

import { theme } from "../ui/theme";
import Search from "./Search";
import Basemap from "./map/Basemap";

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
                    width: "300px",
                }}
            >
                <Search theme={theme} />
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: margin,
                    right: margin,
                    zIndex: 100,
                    width: `${mapW}px`,
                    height: `${mapW * 0.5}px`,
                    backgroundColor: theme.colors.elevation2,
                    overflow: "hidden",
                    borderRadius: theme.radii.lg,
                }}
            >
                <Basemap theme={theme} />
            </div>
        </>
    );
}
