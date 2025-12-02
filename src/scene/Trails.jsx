import { useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useStore } from "@/store/useStore";

export default function Trails() {
    const umap = useStore((s) => s.umap);
    const search = useStore((s) => s.search);
    const getGeneration = useStore((s) => s.getGeneration);
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        if (!search) return;
        const filteredData = getGeneration(search.geoid);
        setTrail(filteredData);
    }, [search, umap]);

    const points = useMemo(() => {
        if (!trail.length) return [];

        return trail.map((p) => new THREE.Vector3(p.x, p.y, p.z));
    }, [trail]);

    if (points.length < 2) return null;

    return (
        <Line
            points={points}
            color="white"
            lineWidth={1}
            alphaWrite={false}
            opacity={0.8}
            dashed
            transparent
            dashScale={20}
        />
    );
}
