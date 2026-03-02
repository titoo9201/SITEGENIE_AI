import axios from "axios";
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;
import Home from "./pages/Home"
import useGetCurrentUser from './hooks/useGetCurrentUser';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import { useSelector } from 'react-redux';
import WebsiteEditor from './pages/WebsiteEditor';
import Livesite from './pages/Livesite';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
export const serverUrl="https://sitegenie-ai.onrender.com"
function App() {
useGetCurrentUser()
const {userData}=useSelector(state=>state.user)
  return (  
 <BrowserRouter>
 <Routes> 
  <Route path='/' element={<Home/>}/>
  <Route path='/dashboard' element={ userData?<Dashboard/>:<Home/>}/>
  <Route path='/generate' element={ userData?<Generate/>:<Home/>}/>
  <Route path='/editor/:id' element={ userData?<WebsiteEditor/>:<Home/>}/>
  <Route path='/site/:id' element={<Livesite/>}/>
  <Route path='/pricing' element={<Pricing/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/contact' element={<Contact/>}/>

 </Routes>
 </BrowserRouter>
  )
}

export default App
