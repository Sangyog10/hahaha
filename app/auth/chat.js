export const sendMessage = async (history, prompt) => {
    try {
        console.log("Sending message to the server:", { history, prompt });
        const res = await fetch("http://127.0.0.1:5000/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ history, prompt }),
        });

        // Check for response success
        const data = await res.json();

        if (!res.ok) {
            console.error("Chatbot connection failed with status:", res.status);
            throw new Error(data.message || "Chatbot connection failed");
        }

        console.log("Received response from chatbot:", data);
        return data;
    } catch (error) {
        console.error("Error sending message:", error);
        return { error: error.message };
    }
};
