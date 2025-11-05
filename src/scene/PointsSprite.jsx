import * as THREE from "three";
import { useLayoutEffect, useState, useMemo } from "react";
import { Html } from "@react-three/drei";

export default function Points({ pt }) {
    // const active = useStore((state) => state.active);

    const texture = pt.active
        ? new THREE.TextureLoader().load(pt.path)
        : undefined;

    return (
        <>
            <sprite
                key={pt.id}
                position={[pt.x, pt.y, pt.z]}
                scale={pt.size}
                name={pt.asciiname}
            >
                <spriteMaterial map={texture} />
                {/* {pt.asciiname == active && (
                    <Html
                        // position={[0, -size / 2, 0]}
                        position={[0, 0, 0]}
                        wrapperClass="label"
                        center
                        distanceFactor={8}
                        style={{
                            fontSize: fontSize,
                            padding:
                                1 * size +
                                "px " +
                                3 * size +
                                "px " +
                                1 * size +
                                "px " +
                                3 * size +
                                "px",
                        }}
                    >
                        {pt.asciiname}
                    </Html>
                )} */}
            </sprite>
        </>
    );
}
