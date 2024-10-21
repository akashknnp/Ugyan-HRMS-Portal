import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../src/index.css'
import '../src/reset.css'
import "./forget.css";
import React from 'react';
import Reset from './components/Reset'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import Categorie from './components/Categorie';
import Profile from './components/Profile';
import Forget from './components/Forget';
import Counter from './components/Counter'
import Fetch from './components/Fetch';

const App = () => {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/categorie" element={<Categorie/>}/>
        <Route path="/logout" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/reset" element={<Reset/>}/>    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
