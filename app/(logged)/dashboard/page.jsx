import Welcome from "@/components/Dashboard/Welcome"
import BarChart from "@/components/Dashboard/BarChart"
import { TrendingUp } from "@mui/icons-material";
import InProgress from "@/components/Dashboard/InProgress";
import Notes from "@/components/Dashboard/Notes";

const lmsAnalyticsData = [
    { day: "Mo", study: 3 },
    { day: "Tu", study: 4 },
    { day: "We", study: 2 },
    { day: "Th", study: 4 },
    { day: "Fr", study: 3 },
    { day: "Sa", study: 5 },
    { day: "Su", study: 2 },
];


const page = () => {
    return (
        <div className="p-6 grid grid-cols-6 w-full flex-1 justify-start gap-4">
            <div className="col-span-3">
                <Welcome />
            </div>
            <div className="col-span-3">
                <InProgress />
            </div>
            <div className="col-span-3 flex flex-col bg-white shadow-md border-[0.3px] rounded-2xl p-4 border-gray h-fit">
                <div className="flex justify-between flex-col gap-4">
                    <span className="text-lg text-dark font-semibold">Activity This Week</span>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center p-[6px] border-2 border-secondary text-secondary rounded-xl">
                            <TrendingUp fontSize="medium" />
                        </div>
                        <div className="flex flex-col">
                            <span>+2 hours</span>
                            <span className="text-secondary">
                                more than last week
                            </span>
                        </div>
                    </div>
                </div>
                <BarChart
                    data={lmsAnalyticsData}
                    xKey="day"
                    barKeys={["study"]}
                    barRadius={8}
                    currentDayColor="#7147ec"
                    previousDayColor="#DDF3F6" // Light gray for previous days
                />
            </div>
            <div className="col-span-3 flex flex-col p-4  h-fit">
                <Notes />
            </div>
        </div>

    )
}

export default page
