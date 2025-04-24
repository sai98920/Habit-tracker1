import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust path if needed
import api from'../../../api'; // Adjust path if needed
const Login = () => {
  const { login } = useAuth(); // from your AuthContext
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/login', form, {
        withCredentials: true, // 🔥 necessary for cookies
      });

      const success=login(form); // ✅ update auth state in context
      if(success)navigate('/dashboard'); // redirect on success
      setForm({ email: '', password: '' }); // reset form
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-indigo-300 p-6">
      <form
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transition-all transform hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <div className="space-y-6">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 transition-all"
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 transition-all"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition-all mt-4"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
