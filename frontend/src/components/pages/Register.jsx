import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      setMessage(res.data.message);
      navigate('/login'); // Redirect to login page after successful registration
      setForm({ username: '', email: '', password: '' }); // Reset form after successful registration
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-indigo-300 p-6">
      <form className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transition-all transform hover:scale-105" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Create an Account</h2>

        <div className="space-y-6">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 transition-all"
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
          className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition-all mt-4"
        >
          Register
        </button>

        {message && <p className="text-center text-sm mt-4 text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
