import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
         const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        navigate('/chat');
    } else {
        alert(data.message);
    }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Sign Up</button>
            <p>Already have an account? <Link to="/auth/login">Login</Link></p>
        </>
    )
}

export default Signup