import { useState, useEffect, useRef } from "react"
import { io } from 'socket.io-client'

function App() {
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
      setMessages(msgs.map(m=>m.text));
    })
  }, [])

  const handleSend = () => {
    if (input.trim() === '') return;
    socketRef.current.emit('chat-message', input)
    setInput('');
  }

  return (
    <>
      <h1>Zemply Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </>
  )
}

export default App
