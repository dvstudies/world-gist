import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds } from "@react-three/drei";

import { useStore } from "../store/useStore";

import PointsSprite from "./PointsSprite.jsx";

export default function Scene() {
    const { umap, cities } = useStore();

    const seed = 2333;
    console.log(umap);

    umap.forEach((pt) => {
        if (pt.timestep < 49) {
            const folder = "./intermediates";
            const tm = pt.timestep.toString();
            const path = `${folder}/${pt.geoid}_${seed}_${tm.padStart(
                3,
                0
            )}.png`;
            pt.path = path;
            pt.size = 0.02;
            pt.active = false;
        } else {
            const folder = "./last";
            const city = cities.find((c) => c.geoid === pt.geoid);
            const path = `${folder}/${city.asciiname}_${pt.geoid}_${seed}.png`;
            pt.path = path;
            pt.size = 0.2;
            pt.active = true;
        }

        return pt;
    });

    return (
        <Canvas style={{ width: "100%", height: "100%" }}>
            <OrbitControls makeDefault />
            <Bounds
                fit
                clip
                observe
                margin={0.4}
            >
                {umap.map((pt) => (
                    <PointsSprite pt={pt} />
                ))}

                {/* <SelectToZoom levaActive={layer.layer}> */}
                {/* <PointsSprite
                    layer={layer.layer}
                    size={size.size}
                /> */}
                {/* </SelectToZoom> */}
            </Bounds>
        </Canvas>
    );
}
