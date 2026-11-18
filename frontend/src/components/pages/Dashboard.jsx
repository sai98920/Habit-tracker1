// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { Line } from "react-chartjs-2"; // Add chart.js for a trend chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../../api";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [recentHabits, setRecentHabits] = useState([]);

  useEffect(() => {
    api
      .get("/api/habits")
      .then((res) => {
        setHabits(res.data);
        setRecentHabits(res.data.slice(-5)); // Get the 5 most recent habits
      })
      .catch((err) => console.error(err));
  }, []);

  const totalHabits = habits.length;
  const totalProgress = habits.reduce((acc, h) => acc + h.progress.length, 0);
  const averageProgress = totalHabits
    ? (totalProgress / totalHabits).toFixed(1)
    : 0;

  // Prepare data for the progress chart
  const progressData = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: "Progress per Habit",
        data: habits.map((habit) => habit.progress.length),
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-300 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          Dashboard
        </h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 text-center">
            <h3 className="text-xl font-semibold text-indigo-700">
              Total Habits
            </h3>
            <p className="text-4xl text-indigo-600 font-bold">{totalHabits}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 text-center">
            <h3 className="text-xl font-semibold text-green-700">
              Total Progress
            </h3>
            <p className="text-4xl text-green-600 font-bold">{totalProgress}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">
              Avg. Progress/Habit
            </h3>
            <p className="text-4xl text-yellow-500 font-bold">
              {averageProgress}
            </p>
          </div>
        </div>

        {/* Habit Progress Trend */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 mb-8">
          <h3 className="text-xl font-semibold text-center text-indigo-700 mb-4">
            Habit Progress Trend
          </h3>
          <Line
            data={progressData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Habit Progress Over Time",
                },
              },
            }}
          />
        </div>

        {/* Recent Habits */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">
            Recent Habits
          </h3>
          <ul className="space-y-4">
            {recentHabits.map((habit) => (
              <li key={habit._id} className="flex justify-between items-center">
                <div className="text-indigo-700 font-semibold">
                  {habit.name}
                </div>
                <div
                  className={`text-sm font-medium ${habit.progress.length === habit.targetDays ? "text-green-600" : "text-yellow-600"}`}
                >
                  {habit.progress.length}/{habit.targetDays} days
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
