/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send } from "@mui/icons-material";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      sender: "bot",
      avatar:
        "https://path.to.bot.avatar", // Replace with actual bot avatar URL
    },
  ]);
  const chatContainerRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    const socket = io("https://51ee-27-34-70-65.ngrok-free.app", {
      transports: ["websocket"],
    });

    // Listen for bot responses
    socket.on("botResponse", (botMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot", avatar: "https://path.to.bot.avatar" }, // Bot's response
      ]);
    });

    // Cleanup WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageText, sender: "user" },
    ]);

    // Emit user's message to the server
    const res = await fetch("https://51ee-27-34-70-65.ngrok-free.app", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);

    socket.emit("userMessage", data.response);
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
