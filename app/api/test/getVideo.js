export const playVideo = async (file_name) => {
    try {
        console.log("Requesting video from the server:", file_name);

        // Make a GET request to fetch the video file
        const res = await fetch(`http://127.0.0.1:5000/videos/${file_name}`, {
            method: "GET",
        });

        // Check if the response is successful
        if (!res.ok) {
            console.error("Failed to fetch video with status:", res.status);
            throw new Error("Failed to fetch the video.");
        }

        // Get the video file as a Blob
        const videoBlob = await res.blob();

        // Create a URL for the Blob
        const videoURL = URL.createObjectURL(videoBlob);

        console.log("Video URL generated:", videoURL);

        // Return the video URL to be used directly as the source
        return videoURL;
    } catch (error) {
        console.error("Error fetching the video:", error);
        return { error: error.message };
    }
};
