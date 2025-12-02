import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

import { useStore } from "@/store/useStore";

import SearchSprite from "./sprites/SearchSprite.jsx";
import HoverSprite from "./sprites/HoverSprite.jsx";

export default function ImagePointCloud({ data }) {
    const search = useStore((s) => s.search);
    const timestep = useStore((s) => s.timestep);
    const sprites = useStore((s) => s.sprites);
    const clusterData = useStore((s) => s.clusterData);

    const timestepPoints = useMemo(() => {
        if (!clusterData) return [];

        const colorLookup = {};
        clusterData.forEach((c) => {
            colorLookup[c.label] = new THREE.Color(c.color);
        });

        return sprites
            .filter((s) => s.timestep === timestep)
            .map((s) => {
                const color =
                    colorLookup[s.cluster] || new THREE.Color("#666666");
                return {
                    x: s.x,
                    y: s.y,
                    z: s.z,
                    r: color.r,
                    g: color.g,
                    b: color.b,
                };
            });
    }, [sprites, timestep, clusterData]);

    const pointsRef = useRef();
    const positionAttr = useRef(null);
    const colorAttr = useRef(null);

    const [hoverIndex, setHoverIndex] = useState(null);

    const positions = useMemo(() => {
        const arr = new Float32Array(sprites.length * 3);
        sprites.forEach((p, i) => arr.set([p.x, p.y, p.z], i * 3));
        return arr;
    }, [sprites]);

    const colors = useMemo(() => {
        const arr = new Float32Array(sprites.length * 3);
        arr.fill(0.4); // default gray
        return arr;
    }, [sprites.length]);

    useEffect(() => {
        if (!pointsRef.current) return;

        positionAttr.current =
            pointsRef.current.geometry.getAttribute("position");
        colorAttr.current = pointsRef.current.geometry.getAttribute("color");
    }, []);

    useEffect(() => {
        if (!pointsRef.current || !clusterData) return;

        const colorLookup = {};
        clusterData.forEach((c) => {
            colorLookup[c.label] = new THREE.Color(c.color);
        });

        const colAttr = colorAttr.current;

        const filtered = sprites.filter((d) => d.timestep === timestep);

        for (let i = 0; i < sprites.length; i++) {
            const sprite = sprites[i];

            const cluster = filtered.find(
                (d) => d.geoid === sprite.geoid
            )?.cluster;

            // const c = colorLookup[cluster] || new THREE.Color("#666666");
            const c =
                timestep < sprite.timestep
                    ? colorLookup[cluster] || new THREE.Color("#444444")
                    : new THREE.Color("#444444");

            colAttr.setXYZ(i, c.r, c.g, c.b);
        }

        colAttr.needsUpdate = true;
    }, [clusterData, sprites, timestep]);

    useFrame(({ raycaster, mouse, camera }) => {
        if (!pointsRef.current) return;

        raycaster.setFromCamera(mouse, camera);

        const pos = positionAttr.current;
        let closestIndex = null;
        let closestDistance = Infinity;

        const tempPoint = new THREE.Vector3();
        const tempClosestPoint = new THREE.Vector3();

        for (let i = 0; i < pos.count; i++) {
            tempPoint.fromBufferAttribute(pos, i);
            raycaster.ray.closestPointToPoint(tempPoint, tempClosestPoint);
            const dist = tempPoint.distanceTo(tempClosestPoint);

            if (dist < closestDistance) {
                closestDistance = dist;
                closestIndex = i;
            }
        }

        const PICKING_THRESHOLD = 0.2;
        setHoverIndex(
            closestDistance < PICKING_THRESHOLD ? closestIndex : null
        );
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={sprites.length}
                        itemSize={3}
                    />

                    <bufferAttribute
                        attach="attributes-color"
                        array={colors}
                        count={sprites.length}
                        itemSize={3}
                    />
                </bufferGeometry>

                <pointsMaterial
                    size={0.05}
                    vertexColors={true} // <-- important
                    sizeAttenuation
                />
            </points>

            {hoverIndex !== null && (
                <HoverSprite
                    spriteData={sprites[hoverIndex]}
                    index={hoverIndex}
                />
            )}

            {search !== null && <SearchSprite spriteData={search} />}

            {timestepPoints.length > 0 && (
                <points key={timestep}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            array={
                                new Float32Array(
                                    timestepPoints.flatMap((p) => [
                                        p.x,
                                        p.y,
                                        p.z,
                                    ])
                                )
                            }
                            count={timestepPoints.length}
                            itemSize={3}
                        />

                        <bufferAttribute
                            attach="attributes-color"
                            array={
                                new Float32Array(
                                    timestepPoints.flatMap((p) => [
                                        p.r,
                                        p.g,
                                        p.b,
                                    ])
                                )
                            }
                            count={timestepPoints.length}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.2}
                        vertexColors={true}
                        sizeAttenuation
                    />
                </points>
            )}
        </>
    );
}
