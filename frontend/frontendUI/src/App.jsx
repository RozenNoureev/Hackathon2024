import { useState } from 'react'
import { Route, Routes } from "react-router-dom";

import './App.css'

import SignInPage from './pages/SignInPage';

import UserPage from './pages/UserPage';


function App() {
  const [token ,setToken] = useState("");
  const [email,setEmail] = useState("")
  const changeToken=(token,email)=>{
    setToken(token)
    setEmail(email)
  }


  return (
    <Routes>


      <Route path='/' element={<SignInPage changeToken={changeToken}  />} />
      <Route path="/home" element={<UserPage email={email} token={token} />} />

    </Routes>

  )
}

export default App
