import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import TransferMoney from './pages/TransferMoney'
function App() {

  return (
    <div >
       <BrowserRouter>
       <Routes>
       <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<TransferMoney />} />
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
