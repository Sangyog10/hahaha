import axios from "axios";

const getAllCourses = async () => {
    try {
        // Make a GET request using Axios
        const res = await axios.get("http://localhost:4000/api/v1/course", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Ensure cookies (if any) are sent with the request
        });

        console.log(res.data); // Log the response data

        return res.data; // Return the response data
    } catch (error) {
        // Handle errors (network errors, API errors)
        console.error("Error:", error.response?.data || error.message);
        return { error: error.response?.data?.message || error.message };
    }
};

export default getAllCourses;