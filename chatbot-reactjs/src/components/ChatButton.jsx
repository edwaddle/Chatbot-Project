const ChatButton = ({ chat, setChatHistory, handleUserChoice, choice }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add the user response to the chat history and move to the next stage
    handleUserChoice(choice);
  };

  return (
    <button onClick={handleFormSubmit} className="chatButton">
      {chat}
    </button>
  );
};

export default ChatButton;
