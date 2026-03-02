import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import useGetCurrentUser from './hooks/useGetCurrentUser';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import { useSelector } from 'react-redux';
import WebsiteEditor from './pages/WebsiteEditor';
import Livesite from './pages/Livesite';
import Pricing from './pages/Pricing';
export const serverUrl="http://localhost:3000"
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

 </Routes>
 </BrowserRouter>
  )
}

export default App
