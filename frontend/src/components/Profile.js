import React from 'react';

function Profile({ user }) {
  if (!user) return null;

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>User Profile</h2>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          background: 'var(--primary-color)', 
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{user.name}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--input-bg)', borderRadius: '8px' }}>
          <p><strong>User ID:</strong> #{user.id}</p>
          <p><strong>Account Status:</strong> Active</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
