import Welcome from "@/components/Dashboard/Welcome"

const page = () => {
    return (
        <div className="p-6 grid grid-cols-6 w-full flex-1">
            <div className="col-span-3 flex flex-col">
                <Welcome />
            </div>
        </div>
    )
}

export default page
