import React from "react";
import ChatbotIcon from "./ChatbotIcon";

// ChatMessage component: Displays user or model messages
const ChatMessage = ({ chat }) => {
  return (
    // Determine whether it is a bot message, or user message
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}-message`}
    >
      {/* User icon if sent by the model*/}
      {chat.role === "model" && <ChatbotIcon />}

      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
