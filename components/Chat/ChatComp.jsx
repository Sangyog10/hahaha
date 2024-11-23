/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

const ChatComp = ({
  chatId,
  name,
  avatar,
  lastMessage,
  time,
  unreadCount,
  currentChat,
  setCurrentChat,
}) => {
  return (
    <div
      className={`flex items-center justify-between border-b-[1px] border-lightGray p-3 ${currentChat === chatId ? "bg-lightMint" : ""
        }`}
      onClick={() => setCurrentChat(chatId)} // Set current chat on click
    >
      <div className="flex items-center gap-2">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQHrT6zBAnondQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727031609722?e=1736985600&v=beta&t=t0O5fKgBHirgrv33xzCTF4gEf13OC1se9db_bPYK5CA"
          className="size-12 rounded-full"
          alt="Avatar"
        />
        <div className="flex flex-col gap-0">
          <span className="text-secondary text-normalText font-medium">
            {name}
          </span>
          <span className="text-smallText text-gray line-clamp-1">
            {lastMessage}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0 justify-end items-end text-end">
        <span className="text-gray">{time}</span>
        {unreadCount > 0 && (
          <div className="flex items-center text-smallText justify-center text-white leading-6 w-6 h-6 bg-primary rounded-full">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComp;
