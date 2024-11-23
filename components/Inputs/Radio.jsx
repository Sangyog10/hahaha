
"use client";
import Image from "next/image";
import { ICONS } from "@/app/assets/Assets";
import { FC } from "react";



const Radio = ({ label, selected, onSelect }) => {
  return (
    <div className="flex items-center gap-1" onClick={onSelect}>
      <Image
        src={selected ? ICONS.radioChecked : ICONS.radioUnchecked}
        alt="radio"
        className="size-6 cursor-pointer"
      />
      <span>{label}</span>
    </div>
  );
};

export default Radio;
