import * as React from "react";

const LayoutBox = ({ className = "", children, color, label }) => (
    <div
        className={`p-4 text-white font-semibold flex items-center justify-center ${color} ${className}`}
    >
        {children || label}
    </div>
);

const ComplexGridLayout = () => {
    return (
        <div className="p-10 h-full w-full bg-black">
            <div className="grid grid-cols-2 h-full gap-4">
                <div className="flex flex-col h-full gap-4">
                    <div className="flex grow h-full gap-4">
                        <LayoutBox
                            color="bg-purple-600"
                            className="w-1/2" // Half of the left column's width
                            label="W & H are adaptive"
                        />

                        <div className="flex flex-col w-1/2 gap-4">
                            <div className="aspect-square bg-blue-700 p-4 text-white font-semibold flex items-center justify-center">
                                this is a square
                            </div>

                            <LayoutBox
                                color="bg-yellow-500"
                                className="grow text-black"
                                label="height is adaptive"
                            />
                        </div>
                    </div>

                    <LayoutBox
                        color="bg-cyan-500"
                        className="w-full aspect-[2/1] shrink-0" // Use 2:1 ratio and prevent shrinking
                        label="height is 1/2 of width (2:1)"
                    />
                </div>

                <LayoutBox
                    color="bg-red-600"
                    className="h-full"
                    label="width is 1/2 of total width and H is full"
                />
            </div>
        </div>
    );
};

export default ComplexGridLayout;
