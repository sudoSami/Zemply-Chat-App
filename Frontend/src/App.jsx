import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Chat from './pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App