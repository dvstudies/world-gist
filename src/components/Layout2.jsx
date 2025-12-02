import * as React from "react";

import ImgViewer from "./composed/ImgViewer";
import MapView from "./composed/MapView";
import Basemap from "@/map/Basemap";
import Scene from "@/scene/Scene";
import Search from "./composed/Search";
import List from "./composed/List";
import { Card } from "./ui/card";

const LayoutBox = ({ className = "", children, color, label }) => (
    <div
        className={`p-4 text-white font-semibold flex items-center justify-center ${color} ${className}`}
    >
        {children || label}
    </div>
);

export default function Layout2() {
    return (
        <div className="p-10 h-full w-full">
            <div className="grid grid-cols-2 h-full gap-4">
                <div className="flex flex-col h-full gap-4">
                    <div className="flex grow h-full gap-4">
                        {/* <Card className="w-3/5 shrink-0">
                            <Search />
                        </Card> */}
                        <List className="w-3/5 shrink-0" />
                        <ImgViewer className="w-1/2" />
                    </div>
                    {/* <MapView className="w-full aspect-[2/1] shrink-0" /> */}
                    <div className="overflow-hidden h-full w-full rounded-2xl shadow-lg">
                        <Basemap />
                    </div>
                </div>

                <div className="overflow-hidden h-full w-full rounded-2xl shadow-lg gradient-bg">
                    <Scene />
                </div>
                {/* <Card
                    className="h-full"
                    label="width is 1/2 of total width and H is full "
                >
                    <Scene />
                </Card> */}
            </div>
        </div>
    );
}
