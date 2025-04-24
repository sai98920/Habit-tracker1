import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AddHabit = () => {
  const [form, setForm] = useState({ name: '', description: '', targetDays: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('http://localhost:5000/api/habits', form);
      setMessage('Habit added successfully!');
      navigate('/habits');
      setForm({ name: '', description: '', targetDays: '' });
    } catch (err) {
      setMessage('Error creating habit');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-indigo-300 p-6">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transition-all transform hover:scale-105" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Create New Habit</h2>

        <div className="space-y-4">
          <input
            className="w-full p-4 border border-indigo-300 rounded-md text-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            name="name"
            placeholder="Habit Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-4 border border-indigo-300 rounded-md text-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-4 border border-indigo-300 rounded-md text-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            name="targetDays"
            type="number"
            placeholder="Target Days"
            value={form.targetDays}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-3 mt-6 rounded-md text-lg hover:bg-indigo-700 transition-all"
        >
          Add Habit
        </button>

        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AddHabit;
