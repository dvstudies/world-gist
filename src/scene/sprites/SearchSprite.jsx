import * as THREE from "three";

import { useBounds } from "@react-three/drei";
import { useRef, useEffect } from "react";

import { useStore } from "@/store/useStore";

const textureLoader = new THREE.TextureLoader();

export default function SearchSprite({ spriteData }) {
    const bounds = useBounds();
    const searchRef = useRef();
    const handleMiss = useStore((s) => s.spriteInteractions.handleMiss);

    const texture = textureLoader.load(spriteData.path);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.position.set(
                spriteData.x,
                spriteData.y,
                spriteData.z
            );
        }
    }, [spriteData]);

    return (
        <>
            <sprite
                ref={searchRef}
                onPointerMissed={() => handleMiss(bounds)}
            >
                <spriteMaterial
                    map={texture}
                    transparent
                    depthWrite={false}
                />
            </sprite>
        </>
    );
}
