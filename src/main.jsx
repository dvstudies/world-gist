import "./style.css";

import { createRoot } from "react-dom/client";
import { use, useEffect, useState } from "react";
import App from "./App.jsx";

import { useStore } from "./store/useStore.jsx";

function Root() {
    const [cities, setCities] = useState(null);
    const [umap, setUmap] = useState(null);

    const [loaded, setLoaded] = useState(0);

    const jsons = {
        cities: { file: "/cities.json" },
        umap: { file: "/umap.json" },
    };

    useEffect(() => {
        Object.entries(jsons).forEach(([key, { file }]) => {
            fetch(file)
                .then((res) => res.json())
                .then((data) => {
                    useStore.setState({ [key]: data.data });
                })
                .catch(console.error)
                .finally(() => {
                    setLoaded((loaded) => loaded + 1);
                });
        });
    }, []);

    if (loaded < Object.keys(jsons).length) {
        return <div className="loader">Loading...</div>;
    }

    return <App />;
}

createRoot(document.getElementById("root")).render(<Root />);
