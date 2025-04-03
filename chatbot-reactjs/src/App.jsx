import "./App.css";
import "./index.css";
import ChatbotIcon from "./components/ChatbotIcon";
import Chatform from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
import { useState } from "react";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  return (
    <div className="containter">
      <div className="chatbot-popup">
        {/*Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button class="material-symbols-outlined">keyboard_arrow_down</button>
        </div>
        {/*chatbot body*/}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can I help?
            </p>
          </div>
          {/* Render the chat history dynamically*/}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/*chatbot footer*/}
        <div className="chat-footer">
          <Chatform setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  );
}

export default App;
