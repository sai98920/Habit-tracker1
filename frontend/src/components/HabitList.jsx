import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { toast } from "react-toastify"; // Optional: For success/error messages
import api from "../../api";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/habits");
      setHabits(res.data);
    } catch (err) {
      toast.error("Failed to fetch habits");
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    setLoading(true);
    try {
      await api.put(`/api/habits/${id}/complete`);
      toast.success("Habit marked as completed!");
      fetchHabits(); // Refresh habits
    } catch (err) {
      toast.error("Failed to mark as completed");
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      setLoading(true);
      try {
        await api.delete(`/api/habits/${id}`);
        toast.success("Habit deleted successfully!");
        fetchHabits(); // Refresh habits
      } catch (err) {
        toast.error("Failed to delete habit");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-r from-indigo-100 to-indigo-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Your Habit Tracker
      </h2>
      <div className="grid gap-6">
        {habits.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            You have no habits yet. Start by adding one!
          </div>
        ) : (
          habits.map((habit) => {
            const isCompleted = habit.progress.length >= habit.targetDays;
            const progressPercentage = Math.min(
              (habit.progress.length / habit.targetDays) * 100,
              100,
            );
            return (
              <div
                key={habit._id}
                className={`bg-white p-6 shadow-lg rounded-lg border ${isCompleted ? "border-green-400" : "border-yellow-400"}`}
              >
                <h3 className="text-xl font-semibold text-indigo-700">
                  {habit.name}
                </h3>
                <p className="text-md text-gray-700 mb-2">
                  {habit.description}
                </p>
                <p className="text-sm text-gray-500">
                  Target Days: {habit.targetDays}
                </p>
                <div className="mt-2">
                  <p
                    className={`text-sm ${isCompleted ? "text-green-600" : "text-yellow-600"}`}
                  >
                    Progress: {habit.progress.length} days / {habit.targetDays}{" "}
                    days
                  </p>
                  <div className="w-full bg-gray-200 rounded-full mt-2">
                    <div
                      className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      {progressPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  {/* Only show Mark Complete if not already completed */}
                  {!isCompleted && (
                    <button
                      onClick={() => markCompleted(habit._id)}
                      className="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700 transition-all"
                    >
                      Mark Complete
                    </button>
                  )}
                  <button
                    onClick={() => deleteHabit(habit._id)}
                    className="bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HabitList;
