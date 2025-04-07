import React, { useRef } from "react";

// Chatform component: Handles user input and submits messages to the chatbot
const Chatform = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  // Create a reference to the input field
  const inputRef = useRef();

  // When form submitted, update chatHistory, and let user know to use the buttons instead
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the user's message from the input field
    const userMessage = inputRef.current.value.trim();

    // If the message is empty, do nothing
    if (!userMessage) return;

    // Update chatHistory with user and model messages
    const newHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
      { role: "model", text: "Please use the buttons" },
    ];
    setChatHistory(newHistory);

    // Delay for realism
    setTimeout(() => {
      generateBotResponse(newHistory); // Generate the bot's response
    }, 600);

    // Clear the input field
    inputRef.current.value = "";
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      {/* Input field for typing messages */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required // Ensure that the input field is not empty before submission
      />
      {/* Submit button for sending the message */}
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default Chatform;
