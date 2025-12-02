import * as THREE from "three";

import { useBounds } from "@react-three/drei";
import { useRef, useEffect } from "react";

import { useStore } from "@/store/useStore";

const textureLoader = new THREE.TextureLoader();

export default function HoverSprite({ spriteData, index }) {
    const bounds = useBounds();
    const spriteRef = useRef();
    const handleClick = useStore((s) => s.spriteInteractions.handleClick);

    const texture = textureLoader.load(spriteData.path);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.position.set(
                spriteData.x,
                spriteData.y,
                spriteData.z
            );
        }
    }, [spriteData]);

    return (
        <>
            <sprite
                ref={spriteRef}
                onClick={(e) => handleClick(e, index, bounds)}
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
