import axios from "axios";

export const handleLogin = async (email, password) => {
  try {
    // Make a POST request using Axios
    const res = await axios.post(
      "http://localhost:4000/api/v1/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Allow cookies to be sent along with the request (if needed)
      }
    );

    console.log(res.data); // Log the response data

    return res.data; // Return the response data
  } catch (error) {
    // Handle errors from the request
    console.error("Error:", error.response?.data || error.message);
    return { error: error.response?.data?.message || error.message };
  }
};
