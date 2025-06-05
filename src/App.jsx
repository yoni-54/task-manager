import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
  { id: 3, title: 'Finish project', completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending

  const addTask = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask === '') {
      alert('Task title cannot be empty!');
      return;
    }
    const taskObj = {
      id: Date.now(),
      title: trimmedTask,
      completed: false,
    };
    setTasks([...tasks, taskObj]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'completed'
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
        <div className="max-w-xl mx-auto mt-16 p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">🎯 Task Manager</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          className="flex-1 border-2 border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="📝 Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded font-medium"
        >
          Add
        </button>
      </div>

      <div className="flex gap-3 justify-center mb-6">
        <button
          className={`px-4 py-1 rounded-full font-medium ${
            filter === 'all' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-1 rounded-full font-medium ${
            filter === 'completed' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`px-4 py-1 rounded-full font-medium ${
            filter === 'pending' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center px-4 py-3 border-l-4 rounded-lg shadow ${
              task.completed
                ? 'bg-green-100 border-green-400 text-gray-600 line-through'
                : 'bg-white border-indigo-300'
            }`}
          >
            <span className="font-medium">{task.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => toggleComplete(task.id)}
                className="text-xs px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
}
