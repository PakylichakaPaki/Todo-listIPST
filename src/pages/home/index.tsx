import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../../entities/task/case/get-tasks/use-case';
import TaskForm from '../../features/task-form';
import CustomDatePicker from '../../shared/components/Date/DatePicker';
import { ITask } from '../../entities/task/slice';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-01-30'));
  const formattedDate = selectedDate.toISOString().split('T')[0];
  const [localTasks, setLocalTasks] = useState<ITask[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'completed'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');

  const loadTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    setLocalTasks(storedTasks[formattedDate] || []);
  };

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, [formattedDate]);

  const { data: fetchedTasks = [], isLoading } = useQuery<ITask[]>({
    queryKey: ['tasks', formattedDate],
    queryFn: () => fetchTasks(formattedDate),
    enabled: localTasks.length === 0,
  });

  const tasks = localTasks.length > 0 ? localTasks : fetchedTasks;
  const filteredTasks = activeTab === 'completed' ? tasks.filter(task => task.completed) : tasks;

  const updateLocalStorage = (updatedTasks: ITask[]) => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    storedTasks[formattedDate] = updatedTasks;
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    setLocalTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = localTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = localTasks.filter(task => task.id !== taskId);
    updateLocalStorage(updatedTasks);
  };

  const openEditModal = (task: ITask) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditText(task.text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTaskId(null);
    setEditTitle('');
    setEditText('');
  };

  const handleSave = () => {
    if (editTaskId !== null) {
      const updatedTasks = localTasks.map(task =>
        task.id === editTaskId ? { ...task, title: editTitle, text: editText } : task
      );
      updateLocalStorage(updatedTasks);
      closeModal();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Tasks for {formattedDate}</h1>
      <div className="text-center mb-4">
        <CustomDatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
      </div>

      {/* Переключение вкладок */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 transition-colors rounded ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('all')}
        >
          All Tasks
        </button>
        <button
          className={`px-4 py-2 transition-colors rounded ${activeTab === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Tasks
        </button>
      </div>

      <TaskForm date={formattedDate} onTaskAdded={loadTasksFromLocalStorage} />

      {isLoading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center mt-4">No tasks found for {formattedDate}</div>
      ) : (
        <ul className="mt-6 space-y-4">
          {filteredTasks.map((task: ITask) => (
            <li
              key={task.id}
              className={`p-4 rounded-md shadow-md flex justify-between items-center ${task.completed ? 'bg-green-100' : 'bg-white'}`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="mr-2"
                />
                <div>
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p>{task.text}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="bg-blue-400 hover:bg-blue-500 transition-colors text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-400 hover:bg-red-500 transition-colors text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Title"
            />
            <textarea
              value={editText}
              onChange={e => setEditText(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Description"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 transition-colors bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 transition-colors bg-blue-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
