"use client";

const DashboardNav = () => {


    return (
        <div className="p-6 border-b-2 border-gray h-[80px] flex items-center justify-between bg-white sticky top-0 z-10 text-secondary">
            <div className="search-container flex items-center bg-gray px-2 rounded-[40px]">
                {/* <input
                    type="text"
                    placeholder="I will change the Icons and Colors!"
                    className="border-0 w-[300px] focus:outline-none focus:border-none pl-1"
                /> */}
            </div>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center bg-primary rounded-xl rotate-45">

                    </div>
                    <span className="text-mediumText text-dark"></span>
                </div>
                <div className="flex items-center gap-3 relative">
                    {/* Notification Icon */}
                    <div
                        className={`size-10 flex items-center justify-center cursor-pointer rounded-full "
                            }`}

                    >

                    </div>

                    <div
                        className={`size-10 flex items-center justify-center cursor-pointer rounded-full "
                            }`}

                    >

                    </div>


                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
