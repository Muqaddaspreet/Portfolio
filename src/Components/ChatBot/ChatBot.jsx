import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoMdChatbubbles, IoMdClose, IoMdSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: "Inter", sans-serif;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid #854ce6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 450px;
    right: -20px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: white;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #854ce6;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 80%;
  ${({ isUser }) =>
    isUser ? "margin-left: auto; flex-direction: row-reverse;" : ""}
`;

const MessageBubble = styled.div`
  background: ${({ isUser, theme }) =>
    isUser ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : theme.bg};
  color: ${({ isUser }) => (isUser ? "white" : "inherit")};
  padding: 12px 16px;
  border-radius: 18px;
  border: ${({ isUser, theme }) =>
    isUser ? "none" : `1px solid ${theme.primary}`};
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  max-width: 100%;

  /* Markdown styling */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 16px 0 8px 0;
    color: ${({ isUser }) => (isUser ? "white" : "#854ce6")};
    font-weight: 600;
  }

  h1 {
    font-size: 18px;
  }
  h2 {
    font-size: 17px;
  }
  h3 {
    font-size: 16px;
  }
  h4,
  h5,
  h6 {
    font-size: 15px;
  }

  p {
    margin: 8px 0;
    line-height: 1.5;
  }

  strong {
    font-weight: 600;
    color: ${({ isUser }) => (isUser ? "white" : "#854ce6")};
  }

  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 12px 0;
    padding-left: 20px;
  }

  li {
    margin: 8px 0;
    line-height: 1.5;
  }

  /* Remove numbering from ordered lists */
  ol {
    list-style: none;
    counter-reset: none;
  }

  ol li {
    counter-increment: none;
  }

  ol li::before {
    content: none;
  }

  /* Add spacing between list items */
  li + li {
    margin-top: 12px;
  }

  /* Link styling */
  a {
    color: ${({ isUser }) => (isUser ? "#e6e6ff" : "#854ce6")};
    text-decoration: underline;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: ${({ isUser }) => (isUser ? "#ffffff" : "#a855f7")};
      text-decoration: none;
    }
  }

  /* Code styling */
  code {
    background: ${({ isUser }) =>
      isUser ? "rgba(255,255,255,0.1)" : "rgba(133, 76, 230, 0.1)"};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 13px;
  }

  /* Blockquote styling */
  blockquote {
    border-left: 3px solid
      ${({ isUser }) => (isUser ? "rgba(255,255,255,0.3)" : "#854ce6")};
    margin: 12px 0;
    padding-left: 12px;
    font-style: italic;
    opacity: 0.9;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ isUser }) =>
    isUser
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #854ce6 0%, #667eea 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
`;

const ChatInput = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.primary + 20};
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.primary + 40};
  border-radius: 25px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #854ce6;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 18px;
  width: fit-content;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #854ce6;
  animation: typing 1.4s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0s;
  }

  @keyframes typing {
    0%,
    80%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your portfolio assistant powered by AI. I can help you with information about Muqaddas's skills, projects, experience, education, and research. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Netlify Function URL - will be automatically available in production
  const getFunctionUrl = () => {
    if (process.env.NODE_ENV === "production") {
      // In production, Netlify automatically provides the function URL
      return "/.netlify/functions/chatbot";
    } else {
      // In development, you can use a local server or mock the function
      return "http://localhost:8888/.netlify/functions/chatbot";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Send message to Netlify Function
      const response = await fetch(getFunctionUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          timestamp: userMessage.timestamp,
          sessionId: "portfolio-chat",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = {
          id: Date.now() + 1,
          text:
            data.response ||
            "I'm sorry, I couldn't process your request. Please try asking about Muqaddas's skills, projects, experience, education, or research.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Fallback responses for common questions
      const fallbackResponse = getFallbackResponse(userMessage.text);
      const botMessage = {
        id: Date.now() + 1,
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("skill") || lowerMessage.includes("technology")) {
      return "Muqaddas has expertise in various technologies including **React**, **Angular**, **Node.js**, **Python**, **Java**, and more. He's particularly strong in full-stack development as evident from his experience, and has worked with distributed systems, and machine learning during his studies. Would you like to know about specific areas?";
    }

    if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
      return "Muqaddas has worked on several interesting projects including **FeastFleet** (food delivery app), **TopVidVault** (video platform), and other projects in machine learning, automation, and distributed systems. Which type of project interests you?";
    }

    if (lowerMessage.includes("experience") || lowerMessage.includes("job")) {
      return "Muqaddas has experience as a **Software Engineer** at Nagarro, working on full-stack development with Angular, Node.js, and .NET. He's also worked as a **Frontend Developer Intern** at VMM Education. Would you like to know more about his specific roles?";
    }

    if (lowerMessage.includes("education") || lowerMessage.includes("degree")) {
      return "Muqaddas completed his **MSc in Applied Computer Science** at Concordia University with a 3.30 GPA. He also has a **B.Tech in Computer Science** from Guru Nanak Dev University with a 3.87 GPA. What would you like to know about his education?";
    }

    if (lowerMessage.includes("research")) {
      return "Muqaddas's research focuses on **machine learning**, **algorithms**, and **digital image processing**. He's worked on projects like Transient Noise Reduction in Speech Signals, Content-Aware Image Resizing, and Heuristic Algorithms for Longest Simple Path. Which research area interests you?";
    }

    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("linkedin")
    ) {
      return "You can reach Muqaddas at [muqaddaspreetsingh@gmail.com](mailto:muqaddaspreetsingh@gmail.com) or connect with him on [LinkedIn](https://www.linkedin.com/in/muqaddaspreet-singh/). He's always open to discussing opportunities!";
    }

    return "I'm here to help you learn more about Muqaddas's portfolio! You can ask me about his skills, projects, experience, education, research, or how to contact him. What would you like to know?";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatBotContainer>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <ChatTitle>Portfolio Assistant</ChatTitle>
            <CloseButton onClick={toggleChat}>
              <IoMdClose />
            </CloseButton>
          </ChatHeader>

          <ChatMessages>
            {messages.map((message) => (
              <Message key={message.id} isUser={message.isUser}>
                <Avatar isUser={message.isUser}>
                  {message.isUser ? "U" : "A"}
                </Avatar>
                <MessageBubble isUser={message.isUser}>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </MessageBubble>
              </Message>
            ))}

            {isTyping && (
              <Message isUser={false}>
                <Avatar isUser={false}>A</Avatar>
                <TypingIndicator>
                  <Dot />
                  <Dot />
                  <Dot />
                </TypingIndicator>
              </Message>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInput>
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Muqaddas's portfolio..."
              disabled={isTyping}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
            >
              <IoMdSend />
            </SendButton>
          </ChatInput>
        </ChatWindow>
      )}

      <ChatButton onClick={toggleChat}>
        <IoMdChatbubbles />
      </ChatButton>
    </ChatBotContainer>
  );
};

export default ChatBot;
