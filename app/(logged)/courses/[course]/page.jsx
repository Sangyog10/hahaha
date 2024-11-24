"use client";
import React from "react";
import { ArrowRightAlt } from "@mui/icons-material";
import { notFound } from "next/navigation";
import Link from "next/link";

// Mock course data
const courses = [
  {
    title: "Front-End Base Course",
    description: "Learn the basics of front-end development.",
    level: "Beginner",
    duration: "3 months",
  },
  {
    title: "Back-End Mastery Course",
    description: "Master the art of back-end development.",
    level: "Advanced",
    duration: "6 months",
  },
];

const CourseDetailPage = ({
  params,
}) => {
  // Use React.use to unwrap the params Promise
  const { course } = React.use(params);

  if (!course) {
    console.log("Course not found");
    notFound(); // Render a 404 page if the course is not found
    return null; // To prevent further rendering
  }

  // Decode the course name from the params
  const courseName = decodeURIComponent(course);
  console.log("Decoded course name:", courseName);

  // Find the course by title
  const courseData = courses.find(
    (c) => c.title.toLowerCase() === courseName?.toLowerCase()
  );

  // If no course is found, render the notFound page
  if (!courseData) {
    console.log("Course not found for:", courseName);
    notFound(); // Render a 404 page if the course is not found
    return null; // To prevent further rendering
  }

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <div className="bread-crump">
        Courses {">"} {courseData.title}
      </div>

      {/* Course Content */}
      <div className="rounded-2xl bg-secondary p-6 text-white flex items-center justify-between h-[320px]">
        {/* Left Side Content */}
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="flex flex-col gap-2">
            <h5 className="text-2xl font-bold">{courseData.title}</h5>
            <p className="text-lightMint">
              {courseData.description} <br />
              Covering essential elements and structure.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="tag">Theory</div>
            <div className="tag">Practical</div>
            <div className="tag">Practice</div>
            <div className="tag">HTML</div>
            <div className="tag">CSS</div>
            <div className="tag">Javascript Basics</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-transparent border-2 cursor-pointer border-white py-3 px-9 rounded-full">
              Inquiry Now
            </div>
            <Link href={`/courses/${encodeURIComponent(courseName)}/learn`}>
              <div className="bg-white border-2 cursor-pointer border-white py-3 px-9 rounded-full text-primary">
                Start Course <ArrowRightAlt />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-cols-2 gap-4 w-[400px] h-full">
          <div className="bg-white rounded-2xl flex items-center justify-center col-span-2">
            <span className="text-dark">Box 1</span>
          </div>
          <div className="bg-white rounded-2xl flex items-center justify-center col-span-1">
            <span className="text-dark">Box 3</span>
          </div>
          <div className="bg-white rounded-2xl flex items-center justify-center col-span-1">
            <span className="text-dark">Box 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
