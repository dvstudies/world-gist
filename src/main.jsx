import "@/index.css";

import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore.jsx";
import { useLoader } from "@/store/useLoader.jsx";

import Loader from "./components/composed/Loader";
import App from "@/App.jsx";

function Root() {
    const loadData = useLoader((s) => s.loadData);
    const isDataReady = useLoader((s) => s.isDataReady);

    useEffect(() => {
        loadData();
    }, []);

    if (!isDataReady) return <Loader label={"Loading data"} />;

    return <App />;
}

createRoot(document.getElementById("root")).render(<Root />);
