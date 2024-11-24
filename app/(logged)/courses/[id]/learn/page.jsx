"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCourse } from "@/app/auth/getCourse";

const Page = () => {
  const pathname = usePathname(); // Get the current path
  const id = pathname.split("/")[2]; // Extract the course ID from the path

  const [courseData, setCourseData] = useState(null); // State to hold course data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentSection, setCurrentSection] = useState(0); // Track current section
  const [currentVideo, setCurrentVideo] = useState(0); // Track current video
  const [videoUrl, setVideoUrl] = useState(""); // Dynamic video URL

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        console.log("No course ID found");
        return;
      }

      try {
        const data = await getCourse(id); // Fetch course data
        if (!data) {
          console.log("Course not found");
          return;
        }
        setCourseData(data.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Fetch the video URL
  useEffect(() => {
    const fetchVideo = async () => {
      if (courseData) {
        const currentSectionData = courseData.sections[currentSection];
        const currentVideoData = currentSectionData.videos[currentVideo];

        try {
          const response = await fetch(
            `http://127.0.0.1:5000/videos/${currentVideoData.videoUrl}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch video");
          }

          const blob = await response.blob();
          setVideoUrl(URL.createObjectURL(blob)); // Create object URL for the video
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      }
    };

    fetchVideo();
  }, [courseData, currentSection, currentVideo]);

  if (loading) return <div>Loading...</div>;
  if (!courseData) return null;

  // Get current section and video data
  const currentSectionData = courseData.sections[currentSection];
  const currentVideoData = currentSectionData.videos[currentVideo];

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{courseData.title}</h2>
        {courseData.sections.map((section, sectionIndex) => (
          <div key={section._id} className="mb-4">
            <h3
              className={`cursor-pointer font-semibold text-lg ${sectionIndex === currentSection ? "text-blue-600" : ""
                }`}
              onClick={() => {
                setCurrentSection(sectionIndex);
                setCurrentVideo(0); // Reset video to the first one
              }}
            >
              {section.title}
            </h3>
            <ul className="pl-4">
              {section.videos.map((video, videoIndex) => (
                <li
                  key={video._id}
                  className={`cursor-pointer py-1 ${sectionIndex === currentSection &&
                      videoIndex === currentVideo
                      ? "text-blue-500 font-medium"
                      : ""
                    }`}
                  onClick={() => setCurrentVideo(videoIndex)}
                >
                  {video.partNumber}. {video.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6 bg-white flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2">{currentSectionData.title}</h2>
        <h3 className="text-lg font-semibold">{currentVideoData.title}</h3>
        <p>Duration: {currentVideoData.duration}</p>

        {/* Video Player */}
        {videoUrl ? (
          <video
            className="w-full rounded-lg border"
            src={videoUrl}
            controls
          ></video>
        ) : (
          <p>Loading video...</p>
        )}

        {/* Study Materials */}
        <div className="mt-4">
          <h4 className="text-lg font-bold">Study Materials</h4>
          <ul className="list-disc pl-6">
            {currentVideoData.studyMaterials.map((material) => (
              <li key={material._id}>
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {material.title} ({material.type.toUpperCase()})
                </a>
                <p className="text-sm text-gray-600">{material.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Page;
