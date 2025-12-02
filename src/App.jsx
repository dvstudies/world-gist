import "./App.css";

import { useEffect } from "react";
import { useStore } from "./store/useStore";

import Layout from "@/components/Layout";
import Landing from "@/components/Landing";
import Scene from "@/scene/Scene";
import GridTest from "@/components/GridTest.jsx";
import Layout2 from "@/components/Layout2.jsx";

export default function App() {
    const landing = useStore((state) => state.landing);

    return (
        // <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
        //     {landing ? (
        //         <Landing />
        //     ) : (
        //         <>
        //             <Layout />
        //             <Scene />
        //         </>
        //     )}
        // </div>

        <Layout2 />
    );
}
