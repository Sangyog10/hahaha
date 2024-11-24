import axios from "axios";

export const getAllNotes = async (title, content) => {
    try {
        // Make a POST request using Axios
        const res = await axios.get(
            "http://localhost:4000/api/v1/note",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Optional, depending on your authentication setup
            }
        );

        console.log(res.data); // Log the response data

        return res.data; // Return the response data, typically the user info or token
    } catch (error) {
        // Handle errors from the request
        console.error("Error:", error.response?.data || error.message);
        return { error: error.response?.data?.message || error.message };
    }
};
