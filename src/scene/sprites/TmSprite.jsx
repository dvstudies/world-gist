import * as THREE from "three";

import { useBounds } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";

import { useStore } from "@/store/useStore";

const textureLoader = new THREE.TextureLoader();

export default function TmSprite({}) {
    const timestep = useStore((s) => s.timestep);
    const umap = useStore((s) => s.umap);
    const [tmsprites, setTMSprites] = useState([]);

    useEffect(() => {
        if ((timestep, umap)) {
            const filtered = umap.filter((d) => d.timestep === timestep);
            setTMSprites(filtered);
        }
    }, [timestep, umap]);

    return (
        <>
            {tmsprites.map((s) => (
                <sprite
                    key={s.geoid}
                    position={[s.x, s.y, s.z]}
                    sizeAttenuation={true}
                >
                    <spriteMaterial
                        map={textureLoader.load(s.path)}
                        transparent
                        depthWrite={false}
                    />
                </sprite>
            ))}
        </>
    );
}
