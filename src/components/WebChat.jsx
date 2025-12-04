import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createSocketConnection from "../socket";
import axios from "axios";
import { URL } from "../Constants";

const WebChat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const loggedInUserId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      loggedInUserId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    if (!targetUserId || !loggedInUserId) return;

    const chat = await axios.get(URL + "chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [loggedInUserId, targetUserId]);

  useEffect(() => {
    if (!targetUserId || !loggedInUserId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user?.firstName,
      targetUserId,
      loggedInUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId, loggedInUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-3/4 mx-auto mt-6 h-[100vh] flex flex-col bg-white rounded-xl shadow-lg border border-gray-200">

      {/* HEADER */}
      <h1 className="p-5 text-xl font-semibold text-gray-800 bg-white border-b border-gray-200 shadow-sm">
        Chat
      </h1>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-scroll p-5 space-y-4 bg-gray-100">
        {messages.map((msg, index) => {
          const isMe = msg?.firstName === user?.firstName;

          return (
            <div
              key={index}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div>
                <div className={`text-sm mb-1 ${isMe ? "text-right" : "text-left"} text-gray-600`}>
                  {msg?.firstName}
                </div>

                <div
                  className={`px-4 py-2 rounded-xl max-w-xs ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>

                <div
                  className={`text-xs mt-1 opacity-40 ${
                    isMe ? "text-right" : "text-left"
                  } text-gray-500`}
                >
                  Seen
                </div>
              </div>
            </div>
          );
        })}

        {/* auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BOX */}
      <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default WebChat;
