// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Features from './pages/Features'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import LinkAnalytics from './pages/LinkAnalytics'
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";


function App() {
 

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/features" element={<Features />} />
        

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/analytics" element={<LinkAnalytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
