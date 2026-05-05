import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "https://be-todo-02240338.onrender.com";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch all tasks
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Add task
  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    const task = await res.json();
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  // Toggle complete
  const toggleTask = async (task) => {
    const res = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  // Save edit
  const saveEdit = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingText }),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    setEditingId(null);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>📝 Todo App</h1>

      {/* Add Task */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          style={{ flex: 1, padding: "10px", fontSize: "1rem" }}
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          style={{ padding: "10px 20px", fontSize: "1rem", cursor: "pointer" }}
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 && <p style={{ color: "gray" }}>No tasks yet. Add one above!</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
          />

          {/* Edit mode or display mode */}
          {editingId === task.id ? (
            <>
              <input
                style={{ flex: 1, padding: "6px" }}
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                autoFocus
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span
                style={{
                  flex: 1,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "black",
                }}
              >
                {task.title}
              </span>
              <button onClick={() => { setEditingId(task.id); setEditingText(task.title); }}>
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
