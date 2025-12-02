import { useLoader } from "@/store/useLoader";

export default function Loader({ label }) {
    const progress = useLoader((s) => s.progress);

    return (
        <div className="loader">
            {label} {progress.toFixed(0)}%
        </div>
    );
}
