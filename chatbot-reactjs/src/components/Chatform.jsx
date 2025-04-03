import React from "react";
import { useRef } from "react";

const Chatform = ({ setChatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) {
      return;
    }
    console.log(userMessage);

    //update chat history with user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    //Thinking
    setChatHistory((history) => [
      ...history,
      { role: "model", text: "Thinking..." },
    ]);
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
      <button class="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default Chatform;
