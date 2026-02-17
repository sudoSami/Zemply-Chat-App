import { useState, useEffect, useRef } from "react"
import { io } from 'socket.io-client'

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:4000');
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

  return (
    <>
      <h1>Zemply Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.username}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </>
  )
}

export default Chat
