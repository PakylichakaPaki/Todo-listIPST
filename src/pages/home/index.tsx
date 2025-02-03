import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../../entities/task/case/get-tasks/use-case';
import TaskForm from '../../features/task-form';
import CustomDatePicker from '../../shared/components/Date/DatePicker';
import { ITask, updateTask } from '../../entities/task/slice';
import { useUpdateTask } from '../../entities/task/case/update-task/presenter';
import { EditTaskModal } from '../../features/edit-task-modal';
import { useDeleteTask } from '../../entities/task/case/delete-task/presenter';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-01-30'));
  const formattedDate = selectedDate.toISOString().split('T')[0];
  const [activeTab, setActiveTab] = useState<'all' | 'completed'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const {toggleTaskCompletion} = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const { data: tasks = [], isLoading } = useQuery<ITask[]>({
    queryKey: ['tasks', formattedDate],
    queryFn: () => fetchTasks(formattedDate),
  });

  const filteredTasks = activeTab === 'completed' 
    ? tasks.filter(task => task.completed) 
    : tasks;

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

  const handleSave = (editedTask: Pick<ITask, 'title' | 'text'>) => {
    if (editTaskId !== null) {
      const updatedTask: ITask = {
        id: editTaskId,
        ...editedTask,
        completed: tasks.find(task => task.id === editTaskId)?.completed || false,
        date: formattedDate
      };
      updateTask(updatedTask);
      closeModal();
    }
  };

  const handleDelete = (taskId: number) => {
    deleteTaskMutation.mutate({ date: formattedDate, taskId });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Задачи на {formattedDate}</h1>
      <div className="text-center mb-4">
      <CustomDatePicker 
        selectedDate={selectedDate} 
        onChange={(date) => setSelectedDate(date ?? new Date())} 
      />
      </div>

      {/* Переключение вкладок */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 transition-colors rounded ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('all')}
        >
          Все задачи
        </button>
        <button
          className={`px-4 py-2 transition-colors rounded ${activeTab === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('completed')}
        >
          Завершенные
        </button>
      </div>

      <TaskForm date={formattedDate} onTaskAdded={() => {}} />

      {isLoading ? (
        <div className="text-center mt-4">Загрузка...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center mt-4">Задачи на {formattedDate} не найдены.</div>
      ) : (
        <ul className="mt-6 space-y-4">
          {filteredTasks.map((task: ITask) => (
            <li
              key={task.id}
              className={`p-4 rounded-md shadow-md flex justify-between items-center ${task.completed ? 'bg-green-100' : 'bg-white'}`}
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="mr-2"
                    id={`task-${task.id}`}
                    aria-label={`Отметить выполнение задачи ${task.title}`}
                  />
                  <label 
                    htmlFor={`task-${task.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">{task.title}</h2>
                      <p>{task.text}</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="bg-blue-400 hover:bg-blue-500 transition-colors text-white px-2 py-1 rounded"
                >
                  Редактирование
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-400 hover:bg-red-500 transition-colors text-white px-2 py-1 rounded"
                >
                  Удаление
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <EditTaskModal
        isOpen={isModalOpen}
        task={{ title: editTitle, text: editText }}
        onClose={closeModal}
        onSave={handleSave}
        onChange={{
          title: setEditTitle,
          text: setEditText
        }}
      />
    </div>
  );
};

export default HomePage;