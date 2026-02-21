import { useState, useEffect, useRef } from "react"
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import './chat.css'

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
    }
}, []);

  useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const socket = io('https://zemply-chat-app.onrender.com');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to server...!')
    })

    socket.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on('old-messages', (msgs)=> {
      setMessages(msgs);
    })

     return () => {
        socket.disconnect();}
  }, [])

  const handleSend = () => {
    if (input.trim() === '') return;
    const username = localStorage.getItem('username');
    socketRef.current.emit('chat-message', {text: input, username})
    setInput('');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
}

  return (
    <div className="chat-container">
        <div className="chat-header">
            <h1>Zemply Chat</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="chat-messages">
            {messages.map((msg, index) => (
                <div key={index} className="message">
                    <strong>{msg.username}:</strong> {msg.text}
                </div>
            ))}
            <div ref={bottomRef}></div>
        </div>
        <div className="chat-input">
            <input
                value={input}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Chat
