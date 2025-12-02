import { useState, useEffect } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

import { useStore } from "@/store/useStore";
import { Maximize2 } from "lucide-react";
import { Minimize2 } from "lucide-react";
import Basemap from "@/map/Basemap";

export default function MapView({ className = "" }) {
    return (
        <>
            <Card className={`w-full overflow-hidden ${className}`}>
                <CardContent>
                    <form className="grow">
                        <div className="flex flex-col gap-6 h-full grow  position-relative">
                            <div className=" w-full rounded-2xl overflow-hidden bg-white position-relative h-full">
                                <Basemap />
                            </div>
                            <div className="gap-2">
                                <Label htmlFor="email">Distance in km</Label>
                                <Slider />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
