import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import io from "socket.io-client"
import sendLogo from "../assets/send.png"
import Message from "./message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../assets/closeIcon.png"

const ENDPOINT = 'https://realtimechatapp-h1l6.onrender.com'
let socket;

const Chat = () => {
    const location = useLocation();
    const user = location.pathname.split("/")[2];
    const [id, setId] = useState("")
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value
        if (message) {
            console.log(message);
            socket.emit('message', { message, id })
            document.getElementById('chatInput').value = ''
        }
    }

    useEffect(() => {

        // Socket Io
        socket = io(ENDPOINT, { transports: ['websocket'] })

        // Connect is event name 
        socket.on('connect', () => {
            setId(socket.id)
        })

        // Emit is used for sending Data
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
        });
        socket.on('userjoined', (data) => {
            setMessages([...messages, data]);
        });

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            socket.emit('disconnected');
            socket.off()
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })

        return () => {
            socket.off();
        }
    }, [messages])


    return (
        // chat Page
        <div className="bg-black w-screen h-screen flex justify-center items-center">
            {/* chat container */}
            <div className="bg-white h-[60%] w-[60%] ">
                {/* header */}
                <div className=" bg-red-400 h-[10%] flex justify-between items-center">
                    <h2 className="mx-[1.5vmax] text-white text-2xl font-bolder" >C Chat</h2>
                    <a href="/">
                        <img src={closeIcon} alt="Close" className="mx-[1.5vmax] hover:scale-125 cursor-pointer" />
                    </a>
                </div>
                {/* chatBox */}
                <ReactScrollToBottom className="h-[80%] box-border overflow-y-auto">
                    {
                        messages.map((item, i) =>
                            <Message key={i} user={item.id === id ? '' : item.user} message={item.text} classs={item.id === id ? 'right' : 'left'} />)
                    }
                </ReactScrollToBottom>
                {/* InputBox */}
                <div className=" h-[10%] box-border flex items-center justify-around border-t-2 border-black">
                    <input type="text" id="chatInput" className="w-full  bg-white p-[1vmax] box-border h-[10%] outline-none border-none text-lg font-roboto" />
                    <button onClick={send} className="bg-red-600 hover:bg-red-800 text-white transition-all duration-300 mr-5 cursor-pointer w-[8%] h-[80%] rounded-lg m-2 group">
                        <img src={sendLogo} alt="Send Button Logo" className="w-[1.2vmax] mx-auto brightness-100 invert translate-all duration-300 group-hover:translate-x-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat