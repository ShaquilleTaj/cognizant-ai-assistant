import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { sendPrompt, loading } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendPrompt(input);
    setInput("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something intelligent..."
      />
      <button disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;