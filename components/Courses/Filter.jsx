"use client";

import { useState } from "react";
import CheckBox from "@/components/Inputs/CheckBox";
import Radio from "@/components/Inputs/Radio";
import Range from "../Inputs/Range";

const Filter = () => {
    const [selectedLevel, setSelectedLevel] = useState("");

    const handleRadioSelect = (level) => {
        setSelectedLevel(level);
    };

    return (
        <div className="flex flex-col gap-8 w-[250px] bg-white h-fit rounded-2xl border-[0.3px] border-lightGray p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <h4 className="font-semibold text-lg">Filters</h4>
                    <span className="text-normalText font-bold">(4)</span>
                </div>
                <button className="text-primary">Clear All</button>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-mediumText font-medium">Topics</span>
                <div className="flex flex-col gap-1">
                    <CheckBox label="Programming" />
                    <CheckBox label="Finance" />
                    <CheckBox label="Cyber Security" />
                    <CheckBox label="UI/UX" />
                    <CheckBox label="Artificial Intelligence" />
                    <CheckBox label="Data Science" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-mediumText font-medium">Level</span>
                <div className="flex flex-col gap-1">
                    <Radio
                        label="Beginner"
                        selected={selectedLevel === "Beginner"}
                        onSelect={() => handleRadioSelect("Beginner")}
                    />
                    <Radio
                        label="Intermediate"
                        selected={selectedLevel === "Intermediate"}
                        onSelect={() => handleRadioSelect("Intermediate")}
                    />
                    <Radio
                        label="Advanced"
                        selected={selectedLevel === "Advanced"}
                        onSelect={() => handleRadioSelect("Advanced")}
                    />
                    <Radio
                        label="Expert"
                        selected={selectedLevel === "Expert"}
                        onSelect={() => handleRadioSelect("Expert")}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-mediumText font-medium">Price Range</span>
                <div className="flex flex-col gap-1">
                    <Range min={200} max={360} />
                </div>
            </div>
        </div>
    );
};

export default Filter;
