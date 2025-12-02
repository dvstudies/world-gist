import { useState, useEffect, useMemo, Fragment } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import { generateRandomColors } from "@/lib/utils";

import { useStore } from "@/store/useStore";

import Search from "./Search";

export default function List({ className = "" }) {
    const umap = useStore((s) => s.umap);
    const timestep = useStore((s) => s.timestep);
    const clusterData = useStore((s) => s.clusterData);

    const [listData, setListData] = useState([]);

    // const [clusters, setClusters] = useState([]);

    useEffect(() => {
        if (!umap) return;
        const filteredData = umap.filter((d) => d.timestep === timestep);
        const labels = new Set(filteredData.map((d) => d.cluster));

        const colors = generateRandomColors(labels.size);
        const clusterData = Array.from(labels).map((label, index) => ({
            label,
            color: colors[index],
            count: filteredData.filter((d) => d.cluster === label).length,
        }));

        const labelledData = filteredData
            .map((d) => ({
                ...d,
                label: d.asciiname,
                cluster: d.cluster,
                color: clusterData.find((c) => c.label === d.cluster)?.color,
            }))
            .sort((a, b) => a.cluster - b.cluster);
        setListData(labelledData);
        useStore.setState({ clusterData, labelledData });
        // setClusters(clusterData);
    }, [umap, timestep]);

    return (
        <Card className={`${className}`}>
            <CardHeader>
                <CardTitle>Search</CardTitle>
                <CardDescription>
                    Search for a city to view its details and generated images.
                </CardDescription>
                <Search />
            </CardHeader>

            <CardContent>
                <form>
                    <div className="flex flex-col gap-6 h-100">
                        <ScrollArea className="h-full w-full rounded-md border">
                            <div className="p-4">
                                <h4 className="mb-4 text-sm leading-none font-medium">
                                    Cities
                                </h4>
                                {listData.map((city) => (
                                    <Fragment key={city.geoid}>
                                        <div
                                            className="text-sm"
                                            style={{
                                                color: clusterData.find(
                                                    (c) =>
                                                        c.label === city.cluster
                                                )?.color,
                                            }}
                                        >
                                            {city.label}
                                        </div>
                                        <Separator className="my-2" />
                                    </Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
