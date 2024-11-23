import { Slider } from "@mui/material";
import { useState, FC } from "react";

const Range = ({ min, max }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    if (Array.isArray(newValue)) {
      setValue(newValue); // TypeScript now knows this is a number array.
      console.log(newValue);
    }
  };

  const valuetext = (value) => {
    return `$${value}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-[2px]">
        <span className="text-secondary p-2 bg-white border-[0.3px] border-lightGray rounded-2xl">
          ${value[0]}
        </span>
        <hr className="flex-1 h-[1px] bg-lightGray" />
        <span className="text-secondary p-2 bg-white border-[0.3px] border-lightGray rounded-2xl">
          ${value[1]}
        </span>
      </div>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        min={min}
        max={max}
        step={1}
        getAriaLabel={() => "Price range"}
        sx={{
          color: "#566CD2", // Change the color of the slider thumb and rail
          "& .MuiSlider-rail": {
            backgroundColor: "#566CD2", // Customize the rail color
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "#566CD2", // Customize the thumb color
          },
          "& .MuiSlider-track": {
            backgroundColor: "#566CD2", // Customize the track color
          },
        }}
      />
    </div>
  );
};

export default Range;
