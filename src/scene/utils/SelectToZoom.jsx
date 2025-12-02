import * as THREE from "three";
import { useBounds } from "@react-three/drei";
import { useStore } from "@/store/useStore";

export default function SelectToZoom({ children }) {
    const bounds = useBounds();
    const sprites = useStore((s) => s.sprites);

    const handleClick = (e) => {
        e.stopPropagation();

        const RADIUS = 1;

        const fitToPoint = (point) => {
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(RADIUS),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            sphere.position.copy(point);
            bounds.refresh(sphere).fit();
        };

        if (e.hasOwnProperty("index") && e.index !== undefined) {
            const idx = e.index;

            const posAttr = e.object.geometry.getAttribute("position");
            const point = new THREE.Vector3(
                posAttr.getX(idx),
                posAttr.getY(idx),
                posAttr.getZ(idx)
            );

            fitToPoint(point);

            const sprite = sprites[idx];
            useStore.setState({ search: sprite });
        }
    };

    const handleMiss = () => {
        bounds.refresh().fit();
        useStore.setState({ search: null });
    };

    return (
        <group
            onClick={handleClick}
            onPointerMissed={handleMiss}
        >
            {children}
        </group>
    );
}
