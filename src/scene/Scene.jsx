import { useEffect, useMemo } from "react";
import { PerspectiveCamera } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, useBounds } from "@react-three/drei";

import { useStore } from "../store/useStore";
import { useLoader } from "@/store/useLoader";

import PointsCloud from "./PointsCloud.jsx";
import Loader from "@/components/composed/Loader";
import CloudBBox from "./CloudBBox.jsx";
import Trails from "./Trails";

export default function Scene() {
    const centroid = useStore((s) => s.centroid);
    const loadRender = useLoader((s) => s.loadRender);
    const isRenderReady = useLoader((s) => s.isRenderReady);
    const bbox = useStore((s) => s.bbox);
    const search = useStore((s) => s.search);

    useEffect(() => {
        loadRender();
    }, []);

    const camera = useMemo(() => {
        const cam = new PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        if (centroid) {
            cam.position.set(0, 0, 0);
            cam.lookAt(centroid.x, centroid.y, centroid.z);
        }

        return cam;
    }, [centroid, bbox]);

    return (
        <>
            {isRenderReady ? (
                <Canvas
                    style={{ width: "100%", height: "100%" }}
                    // camera={camera}
                    camera={camera}
                >
                    <OrbitControls
                        makeDefault
                        enablePan={false}
                        target={[centroid.x, centroid.y, centroid.z]}
                    />
                    <Bounds
                        fit
                        // clip
                        // observe
                        margin={1}
                    >
                        {/* <CloudBBox /> */}
                        <PointsCloud />
                        {search && <Trails search={search} />}
                    </Bounds>
                </Canvas>
            ) : (
                <Loader label={"Loading images"} />
            )}
        </>
    );
}
