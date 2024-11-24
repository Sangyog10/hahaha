"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "@/app/assets/Assets";
import CourseCard from "@/components/Courses/CourseCard";
import Filter from "@/components/Courses/Filter";
import { SlidingTabBar } from "@/components/Utilities/SlidingTab";
import Link from "next/link";
import getAllCourses from "@/app/api/test/courses";

const fetchCourses = async () => {
    const data = await getAllCourses();
    console.log(data);
    return data;
};

const tabs = [
    { id: "all", name: "All Courses" },
    { id: "ongoing", name: "Ongoing Courses" },
    { id: "completed", name: "Completed Courses" },
];

const Page = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    // Fetch courses when the component mounts
    useEffect(() => {
        const loadCourses = async () => {
            const data = await fetchCourses();
            setCourses(data.courses || []); // Save courses in state
            setFilteredCourses(data.courses || []); // Initialize filtered courses
        };

        loadCourses();
    }, []);

    // Filter courses based on search query and active tab
    useEffect(() => {
        const filterCourses = () => {
            let filtered = courses;

            // Filter based on active tab
            if (activeTab === "ongoing") {
                filtered = filtered.filter((course) => course.status === "ongoing");
            } else if (activeTab === "completed") {
                filtered = filtered.filter((course) => course.status === "completed");
            }

            // Filter based on search query
            if (searchQuery.trim() !== "") {
                filtered = filtered.filter((course) =>
                    course.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredCourses(filtered);
        };

        filterCourses();
    }, [courses, activeTab, searchQuery]);

    return (
        <div className="p-6 flex-1 flex">
            <div className="flex flex-1 flex-col">
                {/* Header with Sliding Tabs, Search, and Filter Toggle */}
                <div className="flex items-center justify-between gap-4">
                    {/* Sliding Tabs */}
                    <SlidingTabBar
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tabId) => setActiveTab(tabId)}
                        defaultActiveTab="all"
                    />

                    {/* Search Bar */}
                    <div className="search-container flex flex-1 bg-white items-center border-[0.3px] border-gray-100 px-2 rounded-[40px]">
                        <Image src={ICONS.searchBlack} alt="search" className="size-9" />
                        <input
                            type="text"
                            placeholder="Search for courses"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-0 flex-1 focus:outline-none bg-transparent outline-none focus:border-none pl-1 search-input"
                            style={{ border: "0px !important", background: "transparent !important" }}
                        />
                    </div>

                    {/* Filter Toggle */}
                    <div
                        className="p-2 rounded-full bg-blue-100 cursor-pointer"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                    >
                        <Image
                            src={isFilterOpen ? ICONS.filterRemove : ICONS.filterAdd}
                            alt="toggle filter"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="flex gap-2 mt-3">
                    <div className="flex-1 grid grid-cols-3 gap-3 items-start">
                        {/* Render Filtered Courses */}
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <Link
                                    key={course._id}
                                    href={`/courses/${course._id}`}
                                >
                                    <CourseCard
                                        title={course.title}
                                        description={course.description}
                                        level={course.level}
                                        duration={course.totalDuration}
                                        lessons={course.sections?.reduce(
                                            (acc, section) => acc + section.videos.length,
                                            0
                                        )}
                                        assignments={0} // Assuming no assignment data in API
                                        quizzes={0} // Assuming no quiz data in API
                                        progress={course.progress}
                                        status={course.status}
                                        onStartCourse={() => console.log(`Starting ${course.title}`)}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-500">
                                No courses found.
                            </p>
                        )}
                    </div>

                    {/* Filter Sidebar */}
                    {isFilterOpen && <Filter />}
                </div>
            </div>
        </div>
    );
};

export default Page;
