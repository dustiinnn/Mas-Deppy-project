import { React, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";

const socket = io.connect("http://localhost:8080", {
    path: "/chat",
});

export default function UserChat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatData, setChatData] = useState([]);

    const [chatRoom, setChatRoom] = useState(null);
    const [message, setMessage] = useState("");

    const userData = JSON.parse(localStorage.getItem("userData"));
    const senderId = userData.id;

    const endOfChat = useRef(null); // menambahkan useRef

    const handleIncomingMessage = (data) => {
        console.log(data);
        toast("Ada pesan baru dari client");
        const newChat = {
            message: data.msg,
        };
        setChatData((prevChatData) => {
            return [...prevChatData, newChat];
        });
        endOfChat.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            console.log("connected");
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
            console.log("disconnected");
        });

        // Load chat data on mount
        socket.emit("get-chat-data", senderId, (response) => {
            console.log(response);
            if ((response.response.status = "Ditemukan")) {
                setChatData(response.response.data.chatDetail);
                setChatRoom(response.response.data.id);
                socket.emit("join-room", chatRoom);
                endOfChat.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error(response.message);
            }
        });

        socket.emit("join-room", chatRoom);

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
            // socket.emit("leave-room", chatRoom);
            socket.off("join-room");
        };
    }, []);

    useEffect(() => {
        socket.on("terima-pesan", handleIncomingMessage);

        return () => {
            socket.off("terima-pesan", handleIncomingMessage);
        };
    }, []);

    useEffect(() => {
        const handleConnectToRoom = (room) => {
            console.log(`Connected to room ${room}`);
            socket.on("terima-pesan", handleIncomingMessage);
        };

        if (chatRoom !== null) {
            socket.emit("join-room", chatRoom);
            handleConnectToRoom(chatRoom);
        }

        return () => {
            socket.off("terima-pesan", handleIncomingMessage);
        };
    }, [chatRoom]);

    const handleSendMessage = () => {
        console.log(message);
        if (message.trim() !== "") {
            const data = {
                roomId: chatRoom,
                msg: message,
                senderId: senderId,
            };

            socket.emit("kirim-pesan", data, (response) => {
                console.log(response);
                if (response.response.status === "Success") {
                    const newChat = response.response.data;
                    setChatData((prevChatData) => {
                        return [...prevChatData, newChat];
                    });
                    setMessage("");
                    endOfChat.current.scrollIntoView({ behavior: "smooth" });
                } else {
                    toast.error(response.message);
                }
            });
        }
    };

    useEffect(() => {
        if (endOfChat.current) {
            endOfChat.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatData]);

    return (
        <div>
            <div className="container mx-auto">
                <div className="min-w-full border rounded lg:grid lg:grid-cols">
                    <div className="hidden lg:col-span-2 lg:block">
                        <div className="w-full">
                            <div className="relative flex items-center p-3 border-b border-gray-300">
                                <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="username"
                                />
                                <span className="block ml-2 font-bold text-gray-600">
                                    Admin
                                </span>
                            </div>
                            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                                <ul className="space-y-2">
                                    {chatData &&
                                        chatData.map((chat, index) => (
                                            <li
                                                key={index}
                                                className={`flex justify-${
                                                    chat.senderId === senderId
                                                        ? "end"
                                                        : "start"
                                                }`}
                                            >
                                                <div
                                                    className={`relative max-w-xl px-4 py-2 text-gray-700 ${
                                                        chat.senderId ===
                                                        senderId
                                                            ? "bg-gray-100 rounded-r-full"
                                                            : "rounded-l-full"
                                                    } shadow`}
                                                >
                                                    <span className="block">
                                                        {chat.message}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    <li ref={endOfChat}></li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                    name="message"
                                    id="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSendMessage(e);
                                        }
                                    }}
                                    value={message}
                                />
                                <button
                                    type="submit"
                                    onClick={handleSendMessage}
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
