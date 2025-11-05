import { OrbitControls, Bounds, useBounds } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Layout from "./ui/Layout";
import Scene from "./scene/Scene";

export default function App() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
            }}
        >
            <Layout />
            <Scene />
        </div>
    );
}
