import { ChatProvider, ChatContext } from "./context/ChatContext";
import { useContext } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

function AppContent() {
  const { error } = useContext(ChatContext);

  return (
    <>
      <div className="background-gradient"></div>
      <div className="nebula"></div>
      <div className="background-stars"></div>

      {error && <div className="error-banner">{error}</div>}

      <div className="app-layout">
        <Sidebar />
        <div className="chat-section">
          <ChatWindow />
          <ChatInput />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}

export default App;