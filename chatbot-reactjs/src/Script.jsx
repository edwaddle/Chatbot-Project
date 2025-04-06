const Script = (chatHistory) => {
  const responseMap = {
    /*User choices */
    start: ["Questions", "Overview of phones"],
    "Thinking...": ["lmao"],
    "Overview of phonesEnd ": [],

    /*Bot choices*/
    "Overview of phones": ["End Conversation"],
    Questions: ["Working?"],
  };
  if (chatHistory.length === 0) {
    //user start
    return { response: responseMap["start"] };
  }

  const lastMessage = chatHistory[chatHistory.length - 1].text;
  if (lastMessage === "Overview of phones") {
    console.log("working?");
    return {
      extraMessages: [
        { role: "model", text: "Phone 1: Fast and cheap." },
        { role: "model", text: "Phone 2: Premium with long battery." },
        { role: "model", text: "Phone 3: Great camera, mid-price." },
      ],
      response: ["hey"],
    };
  }

  const combinedKey =
    chatHistory.length > 1
      ? chatHistory[chatHistory.length - 2].text + lastMessage
      : lastMessage;

  return { response: responseMap[combinedKey] || [] };
};

export default Script;
