import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Neon-themed CSS

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState("");

  const API_BASE = "http://localhost:1026/users"; 

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(API_BASE, { fname: newTask, lname: "", email: "" });
      setTasks([...tasks, response.data.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update a task
  const updateTask = async (id) => {
    if (!editText.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    try {
      const response = await axios.put(`${API_BASE}/${id}`, { fname: editText });
      setTasks(tasks.map((task) => (task._id === id ? response.data.data : task)));
      setEditTask(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1 className="neon-title">🟢 Neon To-Do App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="neon-input"
        />
        <button onClick={addTask} className="neon-button">
          Add Task
        </button>
      </div>

      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            {editTask === task._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="neon-input"
              />
            ) : (
              <span className="task-text">{task.fname}</span>
            )}

            <div className="actions">
              {editTask === task._id ? (
                <button onClick={() => updateTask(task._id)} className="neon-button">
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditTask(task._id);
                    setEditText(task.fname);
                  }}
                  className="neon-button"
                >
                  Edit
                </button>
              )}

              <button onClick={() => deleteTask(task._id)} className="neon-button delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
