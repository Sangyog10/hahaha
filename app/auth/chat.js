
export const sendMessage = async (history, prompt) => {
    try {
        const res = await fetch("http://127.0.0.1:5000/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ history, prompt }),
        });

        const data = await res.json();
        if (!res.ok) {
            console.log("Chatbot connection failed");
            throw new Error(data.message || "Chatbot connection failed");
        }

        return data;
    } catch (error) {
        console.error("Error:", error.message);
        return { error: error.message };
    }
};