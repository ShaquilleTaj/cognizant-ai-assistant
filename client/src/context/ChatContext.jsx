import { createContext, useState, useEffect } from "react";
import { streamAIResponse } from "../services/chatService";

export const ChatContext = createContext();
const STORAGE_KEY = "cogni_chats";

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setConversations(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);
  useEffect(() => {
    if (!error) return;
  
    const timer = setTimeout(() => {
      setError(null);
    }, 4000);
  
    return () => clearTimeout(timer);
  }, [error]);

  const createConversation = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    setConversations(prev => [newChat, ...prev]);
    setActiveId(newChat.id);
  };

  const deleteConversation = (id) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    if (updated.length) setActiveId(updated[0].id);
    else setActiveId(null);
  };

  // 🔥 FIXED sendPrompt
  const sendPrompt = async (prompt) => {
    let id = activeId;

    // Auto-create first chat if none exists
    if (!id) {
      const newChat = {
        id: crypto.randomUUID(),
        title: prompt.slice(0, 30),
        messages: [],
      };

      setConversations(prev => [newChat, ...prev]);
      setActiveId(newChat.id);
      id = newChat.id;
    }

    setLoading(true);

    // Add user message + empty assistant placeholder
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id !== id) return conv;

        const updatedMessages = [
          ...conv.messages,
          { role: "user", content: prompt },
          { role: "assistant", content: "" }
        ];

        return {
          ...conv,
          title:
            conv.messages.length === 0
              ? prompt.slice(0, 30)
              : conv.title,
          messages: updatedMessages
        };
      })
    );

    // Stream AI response
    try {
        await streamAIResponse(prompt, (chunk) => {
          setConversations(prev =>
            prev.map(conv => {
              if (conv.id !== id) return conv;
      
              const updated = [...conv.messages];
              updated[updated.length - 1].content += chunk;
      
              return { ...conv, messages: updated };
            })
          );
        });
      } catch (err) {
        setError(err.message);
      
        // Replace assistant placeholder with error message
        setConversations(prev =>
          prev.map(conv => {
            if (conv.id !== id) return conv;
      
            const updated = [...conv.messages];
            updated[updated.length - 1].content =
              "⚠️ " + err.message;
      
            return { ...conv, messages: updated };
          })
        );
      } finally {
        setLoading(false);
      }
  };

  const activeConversation =
    conversations.find(c => c.id === activeId) || null;

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        createConversation,
        deleteConversation,
        sendPrompt,
        setActiveId,
        activeId,
        loading,
        error
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};