import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import TransferMoney from './pages/TransferMoney'
import RequestMoney from './pages/RequestMoney'
import NotificationButton from './pages/Notification'
function App() {

  return (
    <div >
       <BrowserRouter>
       <Routes>
       <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<TransferMoney />} />
          <Route path="/request" element={<RequestMoney />} />
          <Route path="/notification" element={<NotificationButton/>} />

       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
