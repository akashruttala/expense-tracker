import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-card" style={{ marginBottom: '2rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 100 }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem', background: 'linear-gradient(to right, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Expense Tracker
      </h2>
      
      {user && (
        <div className="nav-profile" style={{ position: 'relative' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.5rem 1rem' }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.name} ▼
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu glass-card" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', padding: '1rem', minWidth: '200px', zIndex: 10 }}>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{user.name}</p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.email}</p>
              </div>
              <hr style={{ borderColor: 'var(--surface-border)', margin: '0.5rem 0' }} />
              <button 
                onClick={() => { setShowDropdown(false); navigate('/profile'); }} 
                className="btn" 
                style={{ width: '100%', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white' }}
              >
                View Profile
              </button>
              <button 
                onClick={handleLogout} 
                className="btn btn-danger" 
                style={{ width: '100%', background: 'var(--danger-color)', color: 'white' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
