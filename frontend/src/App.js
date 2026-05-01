import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const API_URL = 'http://127.0.0.1:5000';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intentionally removed localStorage so the app always defaults to /login
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLoginSuccess={handleLoginSuccess} apiUrl={API_URL} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register apiUrl={API_URL} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={user ? <Dashboard user={user} apiUrl={API_URL} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
