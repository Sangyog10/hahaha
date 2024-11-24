"use client";
import React, { useEffect, useState } from "react";
import { ArrowRightAlt } from "@mui/icons-material";
import { notFound } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCourse } from "@/app/auth/getCourse";
import Image from "next/image";

const Page = () => {
  const pathname = usePathname(); // Get the current path
  const id = pathname.split("/").pop(); // Extract the course ID from the path
  console.log(id);

  const [courseData, setCourseData] = useState(null); // State to hold the course data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch course data based on the courseId
  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        console.log("No course ID found");
        notFound(); // If no course ID, return 404
        return;
      }

      try {
        const data = await getCourse(id); // Call the API with courseId
        if (!data) {
          console.log("Course not found");
          notFound(); // If course is not found, render 404 page
          return;
        }
        console.log(data);
        setCourseData(data.course); // Set the course data to state
      } catch (error) {
        console.error("Error fetching course data:", error);
        notFound(); // If there's an error, show 404 page
      } finally {
        setLoading(false); // Set loading to false after fetching the data
      }
    };

    fetchCourse();
  }, [id]); // Re-fetch when the id changes

  // Show loading while fetching data
  if (loading) {
    return <div>Loading...</div>; // You can use a spinner or skeleton loader here
  }

  // If courseData is still null, show the 404 page
  if (!courseData) {
    notFound();
    return null; // Prevent further rendering
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
            <div className="tag text-dark">{courseData.level}</div>
            <div className="tag text-dark">{courseData.category}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-transparent border-2 cursor-pointer border-white py-3 px-9 rounded-full">
              Inquiry Now
            </div>
            <Link href={`/courses/${id}/learn`}>
              <div className="bg-dark border-2 cursor-pointer border-white py-3 px-9 rounded-full text-primary">
                Start Course <ArrowRightAlt />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-cols-2 gap-4 w-[400px] h-full">
          <div className="bg-white rounded-2xl flex items-center justify-center col-span-2">
            <Image src={courseData.thumbnail} alt="thumbnail" className="w-full h-full object-cover"
              width={400} height={80}
            />
          </div>
          <div className="bg-white rounded-2xl flex items-center justify-center col-span-1">
            <Image src={courseData.thumbnail} alt="thumbnail" className="w-full h-full object-cover"
              width={200} height={80}
            />
          </div>
          <div className="bg-white rounded-2xl flex items-center justify-center col-span-1">
            <Image src={courseData.thumbnail} alt="thumbnail" className="w-full h-full object-cover"
              width={200} height={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Page;
