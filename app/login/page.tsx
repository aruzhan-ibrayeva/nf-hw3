// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '../authContext';
import { loginUser } from '../axiosInstance';
import { useRouter } from 'next/navigation';
import './login.css';  // Import the new CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(username, password);
      console.log('LoginPage: Received user =', user);
      login(token, user);
      router.push('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
