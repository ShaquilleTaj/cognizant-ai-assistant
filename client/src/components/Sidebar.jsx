import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { motion } from "framer-motion";

const Sidebar = () => {
  const {
    conversations,
    createConversation,
    deleteConversation,
    setActiveId,
    activeId
  } = useContext(ChatContext);

  return (
    <motion.div
      className="sidebar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="logo">Cognizant AI</div>

      <button className="new-chat" onClick={createConversation}>
        + New Chat
      </button>

      {conversations.map(conv => (
        <motion.div
          key={conv.id}
          whileHover={{ scale: 1.03 }}
          className={`chat-item ${conv.id === activeId ? "active" : ""}`}
          onClick={() => setActiveId(conv.id)}
        >
          <span>{conv.title}</span>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteConversation(conv.id);
            }}
          >
            ×
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Sidebar;