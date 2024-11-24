/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send } from "@mui/icons-material";
import { sendMessage } from "@/app/auth/chat"; // Import sendMessage function

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      sender: "bot",
      avatar: "https://path.to.bot.avatar", // Replace with actual bot avatar URL
    },
  ]);
  const chatContainerRef = useRef(null);

  // Maintain the chat history for the bot
  const [history, setHistory] = useState([]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user's message to the chat and update history
    const userMessage = { text: messageText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setHistory((prevHistory) => [...prevHistory, ["user", messageText]]);

    try {
      // Fetch bot's response
      const response = await sendMessage(history, messageText);

      if (response.error) {
        console.error("Error:", response.error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Oops! Something went wrong. Please try again.",
            sender: "bot",
            avatar: "https://path.to.bot.avatar", // Replace with actual bot avatar URL
          },
        ]);
      } else {
        const botMessage = response.response || "I'm here to help!";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot", avatar: "https://path.to.bot.avatar" },
        ]);
        setHistory((prevHistory) => [...prevHistory, ["bot", botMessage]]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Failed to connect to the chatbot. Please try again later.",
          sender: "bot",
          avatar: "https://path.to.bot.avatar", // Replace with actual bot avatar URL
        },
      ]);
    }
  };

  // Define message bubble border radius based on context
  const getBorderRadius = (isUser, index, messages) => {
    const isLast =
      index === messages.length - 1 ||
      messages[index + 1]?.sender !== messages[index]?.sender;
    const isFirst =
      index === 0 || messages[index - 1]?.sender !== messages[index]?.sender;

    if (isFirst && isLast) return "rounded-full"; // Single message
    if (isFirst)
      return isUser
        ? "rounded-t-full rounded-bl-full"
        : "rounded-t-full rounded-br-full";
    if (isLast)
      return isUser
        ? "rounded-b-full rounded-tl-full"
        : "rounded-b-full rounded-tr-full";
    return isUser
      ? "rounded-bl-full rounded-tl-full"
      : "rounded-br-full rounded-tr-full"; // Middle message
  };

  return (
    <div
      className="w-full p-5 overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="grid grid-cols-4 flex-1 h-full bg-white shadow-md border-[0.3px] border-gray-200 rounded-2xl overflow-hidden">
        {/* Chat Window */}
        <div className="col-span-4 bg-transparent p-6 rounded-r-2xl flex flex-col max-h-full overflow-hidden">
          {/* Messages Display */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto hide-scroll"
            style={{ maxHeight: "calc(100% - 50px)" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 mb-[4px] ${message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {message.sender === "bot" && (
                  <img
                    src={message.avatar}
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`p-3 shadow-sm max-w-xs ${message.sender === "user"
                    ? "bg-secondary text-white"
                    : "bg-white text-black border-[0.3px] border-gray-400"
                    } ${getBorderRadius(
                      message.sender === "user",
                      index,
                      messages
                    )}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2 mt-4 h-[50px]">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full p-2 border-[0.3px] border-lightGray rounded-full"
                placeholder="Type a message"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(e.target.value);
                    e.target.value = ""; // Clear input after sending
                  }
                }}
              />
            </div>
            <button
              onClick={() => {
                const input = document.querySelector('input[type="text"]');
                if (input) {
                  handleSendMessage(input.value);
                  input.value = ""; // Clear input after sending
                }
              }}
              className="bg-secondary text-white p-2 rounded-full"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
