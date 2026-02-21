import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { motion } from "framer-motion";

const ChatWindow = () => {
  const { activeConversation, loading } = useContext(ChatContext);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  if (!activeConversation)
    return <div className="empty">Start a new conversation</div>;

  return (
    <div className="chat-window">
      {activeConversation.messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`message ${msg.role}`}
        >
          {msg.content}
        </motion.div>
      ))}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="typing-dots"
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;