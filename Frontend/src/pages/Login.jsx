import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slice/authSlice';
import { Navigate, Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  if (token) return <Navigate to="/" replace />;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      <p className="mt-2">
        New here? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}