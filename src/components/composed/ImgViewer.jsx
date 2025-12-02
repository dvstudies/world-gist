import { Slider } from "../ui/slider";

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

import { useStore } from "@/store/useStore";

export default function ImgViewer({ className = "" }) {
    const timestep = useStore((s) => s.timestep);
    const search = useStore((s) => s.search);
    const setTimestep = useStore((s) => s.setTimestep);

    // const settings = useStore((s) => s.imgViewerSettings);
    // const { search, timestep } = settings;
    // const updateSettings = useStore((s) => s.updateSettings);

    // const setTimestep = (timestep) =>
    //     updateSettings("imgViewerSettings", { timestep });

    const getPath = useStore((s) => s.getPath);
    const maxTimestep = useStore((s) => s.maxTimestep);

    return (
        <>
            <Card className={`${className}`}>
                <CardHeader>
                    <CardTitle>Generation</CardTitle>
                    <CardDescription>
                        Select a city and adjust the timestep to view the
                        generated image.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <div className="aspect-square bg-neutral-100 rounded-2xl">
                                    {search ? (
                                        <img
                                            className="w-full h-full object-cover rounded-2xl"
                                            src={search?.path}
                                            alt={search?.asciiname}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-500 p-10">
                                            Please select a city to view the
                                            generated image.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="timestep">Timestep</Label>

                                <Slider
                                    value={[timestep]}
                                    max={maxTimestep}
                                    min={1}
                                    step={1}
                                    onValueChange={(value) => {
                                        setTimestep(value[0]);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                {/* <CardFooter className="flex-col gap-2">
                    <Slider />
                </CardFooter> */}
            </Card>
        </>
    );
}
