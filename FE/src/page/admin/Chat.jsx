import { React, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar";
const socket = io.connect("http://localhost:8080", {
    path: "/chat",
});
import moment from "moment/moment";

export default function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatList, setChatList] = useState([]);
    const [selectRoom, setSelectRoom] = useState(null);

    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState("");
    const [userName, setUsername] = useState("User");

    const userData = JSON.parse(localStorage.getItem("userData"));
    const senderId = userData.id;
    const endOfChat = useRef(null); // menambahkan useRef

    useEffect(() => {
        console.log(selectRoom);
        socket.off("terima-pesan");
        socket.off("get-chat-detail");
        socket.emit("get-chat-detail", selectRoom, (response) => {
            if ((response.response.status = "Ditemukan")) {
                setChatData(response.response.data.chatDetail);
                endOfChat.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error(response.message);
            }

            socket.emit("join-room", selectRoom);
            socket.on("terima-pesan", (data) => {
                if (data.roomId === selectRoom) {
                    console.log(data);
                    toast("Ada pesan baru dari client");
                    const newChat = {
                        message: data.msg,
                    };
                    setChatData((prevChatData) => {
                        return [...prevChatData, newChat];
                    });
                    endOfChat.current.scrollIntoView({ behavior: "smooth" }); // men-scroll ke chat paling baru
                }
            });
        });

        socket.emit("join-room", selectRoom);
    }, [selectRoom]);

    const handleSelectRoom = (roomId) => {};

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
        socket.emit("get-chat-data-admin", senderId, (response) => {
            console.log(response);
            if ((response.response.status = "Ditemukan")) {
                console.log(response.response.data);
                setChatList(response.response.data);
            } else {
                toast.error(response.message);
            }
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
        };
    }, []);

    const handleSendMessage = () => {
        console.log(message);
        if (message.trim() !== "") {
            const data = {
                roomId: selectRoom,
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
            <Navbar />
            <div className="container mx-auto">
                <div className="border rounded lg:grid lg:grid-cols-3">
                    <div className="border-r border-gray-300 lg:col-span-1">
                        <ul className="overflow-auto h-[32rem]">
                            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">
                                Chats
                            </h2>
                            <li>
                                {chatList.map((chat) => (
                                    <a
                                        key={chat.id}
                                        onClick={() => setSelectRoom(chat.id)}
                                        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                                    >
                                        <img
                                            className="object-cover w-10 h-10 rounded-full"
                                            src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                            alt="User Avatar"
                                        />
                                        <div className="ml-4">
                                            <div className="font-medium text-gray-800">
                                                {/* {chat.chatDetail[0].message} */}
                                                {chat.user.firstName}{" "}
                                                {chat.user.lastName}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {moment(
                                                    chat.updatedAt
                                                ).fromNow()}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-2 lg:block">
                        <div className="w-full">
                            <div className="relative flex items-center p-3 border-b border-gray-300">
                                <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                    alt="username"
                                />
                                <span className="block ml-2 font-bold text-gray-600">
                                    {userName}
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
