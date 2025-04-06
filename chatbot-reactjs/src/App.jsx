import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import Chatform from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
import ChatButton from "./components/ChatButton";
import conversationData from "./conversation.json"; // Import the JSON file

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currResponse, setCurrResponse] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const divRef = useRef();

  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Initialize with the "start" conversation
    generateBotResponse("start", chatHistory);
  }, []);
  useEffect(() => {
    //scrolls to newest messages whenever chatHistory is updated
    scrollToElement();
  }, [chatHistory]);

  const generateBotResponse = (currentStage, history) => {
    const stage = conversationData[currentStage];

    if (!stage) return;

    if (stage.bot === "end") {
      return;
    }

    // Add model response to chat history
    if (stage.botNext !== undefined) {
      //if bot has multiple messages
      const newHistory = [...history, { role: "model", text: stage.bot }];
      setChatHistory(newHistory);

      // Generate next model response based on the next stage
      setTimeout(() => {
        generateBotResponse(stage.botNext, newHistory);
      }, 600);
    } else {
      const newHistory = [...history, { role: "model", text: stage.bot }];
      setChatHistory(newHistory);

      // Add user options (buttons) to the response
      setCurrResponse(stage.options);

      // Show the buttons after a delay (mimicking response time)
      setButtonsVisible(true);
    }
  };

  const handleUserChoice = (choice) => {
    //stop conversation
    const nextStage = choice.next;

    if (conversationData[choice.next].botNext !== undefined) {
      //if bot has multiple messages
      const newHistory = [
        ...chatHistory,
        { role: "user", text: choice.text },
        { role: "model", text: conversationData[choice.next].bot },
      ];
      setChatHistory(newHistory);

      // Hide the buttons temporarily
      setButtonsVisible(false);

      // Generate next model response based on the next stage
      setTimeout(() => {
        generateBotResponse(conversationData[choice.next].botNext, newHistory);
      }, 600);
    } else {
      // Add user's choice to chat history
      const newHistory = [...chatHistory, { role: "user", text: choice.text }];
      setChatHistory(newHistory);

      // Hide the buttons temporarily
      setButtonsVisible(false);

      // Generate next model response based on the next stage
      setTimeout(() => {
        generateBotResponse(nextStage, newHistory);
      }, 600);
    }
  };
  //console.log(chatHistory);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}

        <div className="chat-body">
          <div className=" message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey, I'm Waddles! <br />
              I'm an AI assistant dedicated to help you choose your phone!
            </p>
          </div>
          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          {/* Render the buttons dynamically based on current response */}
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

        {/* Chatbot Footer */}
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
