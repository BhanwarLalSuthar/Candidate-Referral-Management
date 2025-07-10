import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReferralForm from './pages/ReferralForm';

import './App.css'

function App() {
  // const token = useSelector((state) => state.auth.token);
  // console.log(token)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

  
    </Routes>
  );
}

export default App
