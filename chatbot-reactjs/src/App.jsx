import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import Chatform from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
import ChatButton from "./components/ChatButton";
import conversationData from "./conversation.json"; // Import the conversation flow JSON

function App() {
  // State for storing the conversation history
  const [chatHistory, setChatHistory] = useState([]);

  // Toggles chatbot visibility
  const [showChatbot, setShowChatbot] = useState(false);

  // Stores the current set of options (buttons) for the user
  const [currResponse, setCurrResponse] = useState([]);

  // Controls whether buttons should be visible
  const [buttonsVisible, setButtonsVisible] = useState(true);

  // Ref to enable auto-scrolling to latest message
  const divRef = useRef();

  // Scrolls to the latest message in the chat
  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Initialize the chatbot with "start"
  useEffect(() => {
    generateBotResponse("start", chatHistory);
  }, []);

  // When history updates, scroll to newest messages
  useEffect(() => {
    scrollToElement();
  }, [chatHistory]);

  const generateBotResponse = (currentStage, history) => {
    const stage = conversationData[currentStage];
    if (!stage) return;

    // Stop conversation if bot reaches "end"
    if (stage.bot === "end") {
      return;
    }

    // Handle cases where bot has multiple linked messages
    if (stage.botNext !== undefined) {
      const newHistory = [...history, { role: "model", text: stage.bot }];
      setChatHistory(newHistory);

      //Delay for realism
      setTimeout(() => {
        generateBotResponse(stage.botNext, newHistory);
      }, 600);
    } else {
      // Add bot response to history
      const newHistory = [...history, { role: "model", text: stage.bot }];
      setChatHistory(newHistory);
      setCurrResponse(stage.options);

      // Make buttons visible after bot response
      setButtonsVisible(true);
    }
  };

  // Handles what happens when a user selects an option
  const handleUserChoice = (choice) => {
    const nextStage = choice.next;

    // Check if the bot has multiple messages
    if (conversationData[choice.next].botNext !== undefined) {
      const newHistory = [
        ...chatHistory,
        { role: "user", text: choice.text },
        { role: "model", text: conversationData[choice.next].bot },
      ];
      setChatHistory(newHistory);
      setButtonsVisible(false); // Hide buttons before bot response

      setTimeout(() => {
        generateBotResponse(conversationData[choice.next].botNext, newHistory);
      }, 600);
    } else {
      // Add the user's choice to the chat history
      const newHistory = [...chatHistory, { role: "user", text: choice.text }];
      setChatHistory(newHistory);
      setButtonsVisible(false); // Hide buttons before bot reponse

      setTimeout(() => {
        generateBotResponse(nextStage, newHistory);
      }, 600);
    }
  };

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      {/* Toggle button to show/hide chatbot */}
      <button
        onClick={() => {
          setShowChatbot((prev) => !prev);
        }}
        id="chatbot-toggler"
      >
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>

          {/* Language selector (currently just visual) */}
          <div className="language-selector">
            <label htmlFor="language-select"></label>
            <select id="language-select">
              <option value="English">English</option>
              <option value="Chinese">中文</option>
              <option value="Spanish">Español</option>
            </select>
          </div>

          {/* Collapse button */}
          <button
            onClick={() => {
              setShowChatbot((prev) => !prev);
            }}
            className="material-symbols-outlined"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div className="chat-body">
          {/* Immediately display welcome messages */}
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey, I'm Waddles! <br />
              I'm an AI assistant dedicated to help you choose your phone!
            </p>
          </div>

          {/* Render conversation messages */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          {/* Render option buttons */}
          <div className="buttonContainer" ref={divRef}>
            {buttonsVisible &&
              currResponse.map((option, index) => (
                <ChatButton
                  key={index}
                  chat={option.text}
                  setChatHistory={setChatHistory}
                  handleUserChoice={handleUserChoice}
                  choice={option}
                />
              ))}
          </div>
        </div>

        {/* Chatbot Footer with input field */}
        <div className="chat-footer">
          <Chatform
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            chatHistory={chatHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
