import { useThree } from "@react-three/fiber";
import { useStore } from "@/store/useStore";

export default function SelectToLook({ children }) {
    const { camera, controls } = useThree(); // must have OrbitControls makeDefault

    const handleClick = (e) => {
        e.stopPropagation();

        const { x, y, z } = e.object.position;

        // Update OrbitControls target
        controls.target.set(x, y, z);
        controls.update(); // apply immediately

        useStore.setState({ search: e.object.asciiname });
    };

    const handleMiss = (e) => {
        if (e.button !== 0) return;

        // Reset target to your centroid (recommended)
        const centroid = useStore.getState().centroid;
        controls.target.set(centroid.x, centroid.y, centroid.z);
        controls.update();

        useStore.setState({ active: "" });
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
