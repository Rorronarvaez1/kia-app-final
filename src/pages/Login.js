// pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validUsername = 'admin';
  const validPassword = '1234';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === validUsername && password === validPassword) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '10px 20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0 }}>Log In</h1>
        <img src="/logo.png" alt="Logo" className="logo" style={{ height: '40px' }} />
      </header>

      <div className="login-wrapper" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
            <p style={{ color: 'red', margin: 0 }}>{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}