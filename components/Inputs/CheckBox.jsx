"use client";
import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/app/assets/Assets";
import { FC } from "react";



const CheckBox = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-1">
      <Image
        src={isChecked ? ICONS.boxChecked : ICONS.boxUnchecked}
        alt="checkbox"
        className="size-6 cursor-pointer"
        onClick={handleCheck}
      />
      {props.label && <span>{props.label}</span>} {/* Conditional rendering */}
    </div>
  );
};

export default CheckBox;
