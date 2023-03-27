import React, { useState, useEffect, useRef } from "react";
import { GrClosedCaption, GrFormClose } from "react-icons/gr";
import { TbSend } from "react-icons/tb";
import { BsFillChatDotsFill } from "react-icons/bs";
import io from "socket.io-client";
import { toast } from "react-toastify";

const socket = io.connect("http://localhost:8080", {
    path: "/chat",
});

function FloatingChat() {
    const [showChatPopup, setShowChatPopup] = useState(false);
    const [chatRoom, setChatRoom] = useState(null);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const senderId = userData.id;

    const [chatData, setChatData] = useState(null);

    const handleClick = () => {
        setShowChatPopup(true);
        socket.emit("get-chat-data", senderId, (response) => {
            console.log(response);
            if (response.response.status === "Tidak ditemukan") {
                console.log(response.response.roomId);
                setChatRoom(response.response.roomId);
            } else {
                console.log(response.response.data.id);
                setChatRoom(response.response.data.id);
                console.log(response.response.data);
                setChatData(response.response.data);
                console.log(`Chat Data: ${chatData}`);
            }
        });
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white focus:outline-none text-center"
            >
                <span className="sr-only">Chat</span>
                <BsFillChatDotsFill
                    color="white"
                    size={40}
                    className="text-center"
                />
            </button>
            {showChatPopup && (
                <ChatPopup
                    onClose={() => setShowChatPopup(false)}
                    senderId={senderId}
                    chatRoom={chatRoom}
                    setChatRoom={setChatRoom}
                    chatData={chatData}
                    setChatData={setChatData}
                />
            )}
        </>
    );
}

function ChatPopup({
    onClose,
    senderId,
    chatRoom,
    setChatRoom,
    chatData,
    setChatData,
}) {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    useEffect(() => {
        socket.on("receive-message", (data) => {
            setMessageReceived(data.message);
        });
    }, []);

    const sendMessage = () => {
        const msg = {
            message: message,
            senderId: senderId,
            roomId: chatRoom,
        };

        socket.emit("kirim-pesan", msg, (response) => {
            console.log(response);
            if (response.response.status === "Error") {
                toast.error(response.response.data);
            }
            toast.success(`Sukses kirim peslan`);
            setChatData([...chatData, response.response.data]);
            setMessage("");
        });
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const handleClose = () => {
        onClose();
        setMessage("");
        setMessageReceived("");
        setChatRoom("");
        setChatData([]);
    };

    return (
        <div className="chat-popup">
            <div className="chat-header">
                <h4>Room Chat</h4>
                <button className="close-btn" onClick={handleClose}>
                    X
                </button>
            </div>
            <div className="chat-body">
                <div className="message-container">
                    {chatData &&
                        chatData.map((data, index) => (
                            <Message
                                key={index}
                                data={data}
                                senderId={senderId}
                            />
                        ))}
                    {messageReceived && (
                        <div className="message-received">
                            <span>{messageReceived}</span>
                        </div>
                    )}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="send-btn" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FloatingChat;
