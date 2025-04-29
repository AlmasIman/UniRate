import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from "./Button.jsx";
import aiIcon from "../assets/chatBot.png";
import close from "../assets/icons/x.svg";
import chat from "../assets/icons/chat.svg";
import homeStyle from "../assets/styles/Home.module.css";

const apiKey = "AIzaSyBlwq49fRxuAobKjoRimhXnfvAoWnndFuM";
const genAI = new GoogleGenerativeAI(apiKey);
const systemPrompt =
  "You are an assistant on my website that helps Kazakhstani schoolchildren, applicants in choosing a university and provide them with all the necessary information regarding this.(Your answers must be short and informative) The name of my website is UniRate. It helps students, schoolchildren, applicants in choosing a university by providing information. The site has a page universities, which will provide a list of universities and a filter for universities. There is also a page where information about the chosen university is provided, such as name, description, location, rating, faculties, specialties, as well as user reviews. And there is also a forum where users can communicate and ask questions. There is also a financial calculator that will calculate the cost of studying. And there is also a comparison of universities, you choose from two to 4 universities and see their differences and compare them. Also Answer in the same language in which they write to you";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatAvailable, setIsChatAvailable] = useState(false);

  const handleOpenChatbot = () => {
    setIsChatAvailable(!isChatAvailable);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newMessages = [...messages, { text: input, type: "user", time }];
    setMessages(newMessages);
    setInput("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Combine system prompt with user input
      const result = await model.generateContent(
        `${systemPrompt}\nUser: ${input}\nAI:`
      );

      const response = await result.response;
      const text = response.text();

      setMessages([...newMessages, { text, type: "bot", time }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages,
        { text: "Error: Unable to fetch response.", type: "bot", time },
      ]);
    }
    setLoading(false);
  };

  return (
    <div>
      <img
        src={chat}
        alt="chat-icon"
        className={homeStyle.chatIcon}
        onClick={handleOpenChatbot}
      />
{isChatAvailable && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(45, 45, 45, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      padding: "10px",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        height: "90%",
        maxHeight: "95vh",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        paddingTop: "19px",
        zIndex: 1000,
        overflow: "hidden",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Закрытие */}
      <div
        style={{
          width: "88%",
          display: "flex",
          margin: "0 auto",
          justifyContent: "end",
        }}
      >
        <img
          src={close}
          alt="close"
          style={{
            width: "30px",
            cursor: "pointer",
          }}
          onClick={handleOpenChatbot}
        />
      </div>

      {/* Заголовок и иконка */}
      <div style={{ width: "88%", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <img
            src={aiIcon}
            alt="icon"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <p style={{ fontSize: "16px", fontWeight: "700" }}>CampusMate</p>
            <p style={{ fontSize: "12px", color: "rgba(98, 98, 100, 1)" }}>
              Ai assistant
            </p>
          </div>
        </div>
        <hr />
      </div>

      {/* Сообщения */}
      <div
        style={{
          width: "88%",
          margin: "0 auto",
          overflowY: "auto",
          paddingBottom: "20px",
          flex: 1,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <div
              style={{
                padding: "10px",
                margin: "6px 0",
                borderRadius: "12px",
                maxWidth: "80%",
                backgroundColor:
                  msg.type === "user" ? "white" : "rgba(247, 247, 247, 1)",
                color: msg.type === "user" ? "black" : "#000",
                textAlign: msg.type === "user" ? "right" : "left",
                marginLeft: msg.type === "user" ? "auto" : "unset",
                marginRight: msg.type === "bot" ? "auto" : "unset",
              }}
            >
              {msg.text}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#888",
                textAlign: msg.type === "user" ? "right" : "left",
                marginTop: "4px",
              }}
            >
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      {/* Ввод */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "10px 6%",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "12px 20px",
            border: "1px solid #ccc",
            borderRadius: "20px",
            minWidth: "0",
          }}
        />
        <div onClick={sendMessage} disabled={loading}>
          <Button content={loading ? "Thinking..." : "Send"} />
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Chatbot;
