import React, { useState } from 'react';
import Input from '../../shared/components/input';
import { ITask } from '../../entities/task/slice';

const TaskForm: React.FC<{ date: string; onTaskAdded: () => void }> = ({ date, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ITask = { id: Date.now(), title, text, completed: false, date };

    // Сохранение в localStorage
    const localTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    const updatedTasks = localTasks[date] ? [...localTasks[date], newTask] : [newTask];
    localTasks[date] = updatedTasks;
    localStorage.setItem('tasks', JSON.stringify(localTasks));

    onTaskAdded();

    setTitle('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
          Description
        </label>
        <textarea
          id="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 transition-colors rounded focus:outline-none focus:shadow-outline"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
