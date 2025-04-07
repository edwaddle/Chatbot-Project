// ChatButton component: Renders a button with a choice for the user to select
const ChatButton = ({ chat, handleUserChoice, choice }) => {
  // Button clicked, call handleUserFunction with selected choice
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleUserChoice(choice);
  };

  return (
    // Button element that triggers handleFormSubmit when clicked
    <button onClick={handleFormSubmit} className="chatButton">
      {chat} {/* Display the chat option*/}
    </button>
  );
};

export default ChatButton;
