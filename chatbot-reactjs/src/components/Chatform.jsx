import React, { useRef } from "react";

const Chatform = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    const newHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
      { role: "model", text: "Thinking..." },
    ];

    // Update chat history with user + placeholder
    setChatHistory(newHistory);

    // Call the bot after a delay
    setTimeout(() => {
      generateBotResponse(newHistory);
    }, 600);

    // Clear the input field after submission
    inputRef.current.value = "";
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default Chatform;
