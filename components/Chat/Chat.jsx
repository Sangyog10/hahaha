"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Send } from "@mui/icons-material"
import { sendMessage } from '@/app/auth/chat'

const Chat = () => {
  const router = useRouter()
  const { message } = router.query  // Get the 'message' query parameter passed from the Welcome page

  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot", avatar: "https://path.to.bot.avatar" }
  ])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (message) {
      // When message is available, send it immediately
      handleSendMessage(message)
    }
  }, [message])

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return

    const userMessage = { text: messageText, sender: "user" }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setHistory((prevHistory) => [...prevHistory, ["user", messageText]])

    let formattedHistory = ""
    formattedHistory += history.map(([sender, text]) => `${sender === "user" ? "student" : "gemini"}: <<${text}>>`).join("\n")

    try {
      const response = await sendMessage(formattedHistory, messageText)
      if (response.error) {
        console.error("Error:", response.error)
        setMessages((prevMessages) => [...prevMessages, { text: "Oops! Something went wrong. Please try again.", sender: "bot", avatar: "https://path.to.bot.avatar" }])
      } else {
        const botMessage = response.response || "I'm here to help!"
        setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: "bot", avatar: "https://path.to.bot.avatar" }])
        setHistory((prevHistory) => [...prevHistory, ["bot", botMessage]])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prevMessages) => [...prevMessages, { text: "Failed to connect to the chatbot. Please try again later.", sender: "bot", avatar: "https://path.to.bot.avatar" }])
    }
  }

  return (
    <div className="w-full p-5">
      {/* Chat UI rendering here */}
      <div>
        {/* Messages and input */}
        {messages.map((message, index) => (
          <div key={index}>
            {/* Render messages here */}
          </div>
        ))}
        <div>
          {/* Input and Send button */}
          <button onClick={() => handleSendMessage("Test message")}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
