"use client";

import Image from "next/image";
import { ICONS } from "@/app/assets/Assets"; // Replace with actual paths
import { useState } from "react";
import { redirect } from 'next/navigation'
 

const QuestionsOpt = ({ questions}) => {
  const [selectedIndexes, setSelectedIndexes] = useState({}); // Tracks selected index for each question
  const [trackSubmit, setTrackSubmit] = useState(0); // Tracks if the submit button has been clicked

  const checkIndex = (questionIndex, optionIndex) => {
    setSelectedIndexes((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

 
  const handleSubmit = () => {
    if(Object.keys(selectedIndexes).length <=0){
      alert("Please select an option")
      return;
    }
    setTrackSubmit(1)
    redirect('/test/result')
  }

  return (
    <>
      {questions.map((item, i) => (
        <div className="flex flex-col mb-6" key={i}>
          <h6 className="text-black font-semibold">
            {i + 1}. {item?.question}
          </h6>
          <div className="flex flex-col text-gray-400 px-4 mt-2">
            {item?.options.map((opt, index) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                key={index}
                onClick={() => checkIndex(i, index)} // Pass question and option indices
              >
                <Image
                  src={
                    selectedIndexes[i] === index
                      ? ICONS.arrowRight
                      : ICONS?.barChart
                  }
                  alt="check"
                  className="size-6"
                />
                <span
                  className={`${
                    selectedIndexes[i] === index ? "text-blue-500" : ""
                  }`}
                >
                  {opt}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 disabled:bg-gray-300"
        onClick={handleSubmit}
        disabled={trackSubmit}
       >
        Submit
      </button>
    </>
  );
};

export default QuestionsOpt;
