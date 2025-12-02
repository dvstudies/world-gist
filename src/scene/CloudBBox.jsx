import { useStore } from "@/store/useStore";

export default function CloudBBox() {
    const bbox = useStore((s) => s.bbox);

    if (!bbox) return null;

    const { center, size } = bbox;

    return (
        <mesh position={center}>
            <boxGeometry args={size} />
            <meshBasicMaterial
                transparent
                opacity={0}
                wireframe
            />
        </mesh>
    );
}
