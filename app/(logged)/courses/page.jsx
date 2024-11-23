"use client";
import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/app/assets/Assets";
import CourseCard from "@/components/Courses/CourseCard";
import Filter from "@/components/Courses/Filter";
import { SlidingTabBar } from "@/components/Utilities/SlidingTab";
import Link from "next/link";

const tabs = [
    { id: "all", name: "All Courses" },
    { id: "ongoing", name: "Ongoing Courses" },
    { id: "completed", name: "Completed Courses" },
];

const Page = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Dummy courses data - replace with your courses
    const courses = [
        {
            title: "Front-End Base Course",
            description:
                "Beginner's guide to front-end development. Learn the basics of HTML, CSS, and JavaScript. No prior experience required. Start your journey now!",
            level: "Beginner",
            duration: "12.3h left",
            lessons: 125,
            assignments: 290,
            quizzes: 30,
            status: "ongoing",
            progress: 35,
        },
        {
            title: "Advanced React Development",
            description:
                "Master advanced React concepts including hooks, context, and state management. Build scalable, production-ready apps.",
            level: "Advanced",
            duration: "18.5h left",
            lessons: 150,
            assignments: 350,
            quizzes: 40,
            status: "ongoing",
            progress: 50,
        },
        {
            title: "Full-Stack Development Bootcamp",
            description:
                "Become a full-stack developer. Learn front-end, back-end, databases, and deployment techniques in one comprehensive course.",
            level: "Intermediate",
            duration: "20.0h left",
            lessons: 200,
            assignments: 400,
            quizzes: 50,
            status: "completed",
            progress: 100,
        },
        {
            title: "UI/UX Design Fundamentals",
            description:
                "Learn the principles of user-centered design, wireframing, and prototyping. Create stunning, user-friendly interfaces.",
            level: "Beginner",
            duration: "10.0h left",
            lessons: 80,
            assignments: 120,
            quizzes: 15,
            status: "Not Started",
            progress: 0,
        },
        {
            title: "Data Structures & Algorithms",
            description:
                "Understand core data structures and algorithms to solve complex coding problems and ace technical interviews.",
            level: "Intermediate",
            duration: "15.0h left",
            lessons: 140,
            assignments: 200,
            quizzes: 25,
            status: "completed",
            progress: 100,
        },
        {
            title: "DevOps for Beginners",
            description:
                "Learn the basics of DevOps, including CI/CD pipelines, Docker, Kubernetes, and cloud deployment strategies.",
            level: "Beginner",
            duration: "13.2h left",
            lessons: 100,
            assignments: 150,
            quizzes: 20,
            status: "completed",
            progress: 100,
        },
        {
            title: "Python for Data Science",
            description:
                "Master Python programming with a focus on data analysis, visualization, and machine learning basics.",
            level: "Intermediate",
            duration: "17.4h left",
            lessons: 130,
            assignments: 240,
            quizzes: 35,
            status: "completed",
            progress: 100,
        },
        {
            title: "Cybersecurity Essentials",
            description:
                "Learn fundamental cybersecurity concepts, including threat detection, network security, and ethical hacking.",
            level: "Beginner",
            duration: "12.0h left",
            lessons: 90,
            assignments: 110,
            quizzes: 15,
            status: "completed",
            progress: 100,
        },
        {
            title: "Mobile App Development with Flutter",
            description:
                "Learn to build cross-platform mobile applications using Flutter and Dart. Design stunning and performant apps.",
            level: "Intermediate",
            duration: "16.5h left",
            lessons: 120,
            assignments: 210,
            quizzes: 30,
            status: "completed",
            progress: 100,
        },
        {
            title: "AI & Machine Learning Crash Course",
            description:
                "Dive into artificial intelligence and machine learning basics, including neural networks and supervised learning.",
            level: "Advanced",
            duration: "20.0h left",
            lessons: 180,
            assignments: 350,
            quizzes: 50,
            status: "completed",
            progress: 100,
        },
        {
            title: "JavaScript Essentials",
            description:
                "Learn core JavaScript concepts, including ES6 features, DOM manipulation, and asynchronous programming.",
            level: "Beginner",
            duration: "11.5h left",
            lessons: 110,
            assignments: 170,
            quizzes: 20,
            status: "ongoing",
            progress: 20,
        },
        {
            title: "Node.js & Express Backend Development",
            description:
                "Master backend development with Node.js and Express. Learn REST APIs, middleware, and database integration.",
            level: "Intermediate",
            duration: "19.0h left",
            lessons: 160,
            assignments: 300,
            quizzes: 40,
            status: "Not Started",
            progress: 0,
        },
        {
            title: "AWS Cloud Practitioner Guide",
            description:
                "Learn the basics of cloud computing with AWS. Gain skills in cloud architecture, security, and cost management.",
            level: "Beginner",
            duration: "14.0h left",
            lessons: 100,
            assignments: 180,
            quizzes: 25,
            status: "Not Started",
            progress: 0,
        },
        {
            title: "Blockchain Development for Beginners",
            description:
                "Understand blockchain technology and learn to build decentralized applications using Ethereum and Solidity.",
            level: "Advanced",
            duration: "22.0h left",
            lessons: 200,
            assignments: 400,
            quizzes: 50,
            status: "Not Started",
            progress: 0,
        },
    ];

    // Filter courses based on active tab and search query
    const filteredCourses = courses.filter((course) => {
        // Filter by search query
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by active tab
        if (activeTab === "all") return matchesSearch;
        if (activeTab === "ongoing")
            return matchesSearch && course.status === "ongoing";
        if (activeTab === "completed")
            return matchesSearch && course.status === "completed";

        return false;
    });


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
                        <Image src={ICONS.searchBlack} alt="search" className="size-9 " />
                        <input
                            type="text"
                            placeholder="Search for courses"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-0 flex-1 focus:outline-none bg-transparent focus:border-none pl-1"
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
                            filteredCourses.map((course, index) => (
                                <Link key={index} href={`/courses/${encodeURIComponent(course.title)}`}>
                                    <CourseCard
                                        title={course.title}
                                        description={course.description}
                                        level={course.level}
                                        duration={course.duration}
                                        lessons={course.lessons}
                                        assignments={course.assignments}
                                        quizzes={course.quizzes}
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
