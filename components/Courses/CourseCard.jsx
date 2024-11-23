import Image from "next/image";
import { ICONS } from "@/app/assets/Assets";

// Correctly destructure the props object
const CourseCard = ({
    title,
    description,
    level,
    duration,
    lessons,
    assignments,
    quizzes,
    progress,
    onStartCourse
}) => {
    return (
        <div className="flex flex-col bg-white shadow-md rounded-2xl p-4 gap-6 border-[0.3px] border-gray-300">
            <h6 className="font-semibold text-lg text-dark h-[50px] line-clamp-2">{title}</h6>
            <div className="flex flex-col flex-1 justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="tag px-4 py-2 w-fit rounded-full text-smallText text-dark flex items-center gap-1 font-medium">
                        <Image src={ICONS.level} alt="level" className="size-5" />
                        <span>{level}</span>
                    </div>
                </div>
                <p className="line-clamp-2 text-gray-600">{description}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Image
                                src={ICONS.sandClock}
                                alt="course duration"
                                className="size-4"
                            />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image
                                src={ICONS.courseOutline}
                                alt="lessons"
                                className="size-4"
                            />
                            <span>{lessons} lessons</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Image
                                src={ICONS.assignmentOutline}
                                alt="assignments"
                                className="size-4"
                            />
                            <span>{assignments} assignments</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={ICONS.quiz} alt="quizzes" className="size-4" />
                            <span>{quizzes} quizzes</span>
                        </div>
                    </div>
                </div>
                <button
                    className="btn btn-primary rounded-full py-3"
                    onClick={onStartCourse}
                >
                    <span className="z-20 text-white">
                        {progress === 0
                            ? "Start Course"
                            : progress === 100
                                ? "Revisit"
                                : "Resume"}
                    </span>{" "}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
