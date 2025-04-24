import React, { useState,  } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import AddHabit from "./components/AddHabbbit";
import HabitList from "./components/HabitList";
import PrivateRoute from './components/ProtectedRoute';
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
              <Route path="/add" element={<AddHabit />} />
              <Route path="/habits" element={<HabitList />} />
              <Route path="*" element={<Dashboard />} /> {/* fallback route */}
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
