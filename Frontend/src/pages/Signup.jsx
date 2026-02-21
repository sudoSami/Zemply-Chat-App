import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './login.css'


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
         const response = await fetch('https://zemply-chat-app.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        navigate('/');
    } else {
        alert(data.message);
    }
    }

    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Sign Up</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup