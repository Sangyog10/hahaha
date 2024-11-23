
export const sendMessage = async (history, prompt) => {
    try {
        const res = await fetch("https://d758-27-34-70-65.ngrok-free.app/chatbot", {
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