import React from 'react';
import { ITask } from '../../entities/task/slice';

interface EditTaskModalProps {
  isOpen: boolean;
  task: {
    title: string;
    text: string;
  };
  onClose: () => void;
  onSave: (task: Pick<ITask, 'title' | 'text'>) => void;
  onChange: {
    title: (value: string) => void;
    text: (value: string) => void;
  };
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onSave,
  onChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Редактирование задачи</h2>
        <input
          type="text"
          value={task.title}
          onChange={e => onChange.title(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Заголовок"
        />
        <textarea
          value={task.text}
          onChange={e => onChange.text(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Описание"
        />
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 transition-colors bg-gray-300 rounded"
          >
            Отмена
          </button>
          <button 
            onClick={() => onSave(task)} 
            className="px-4 py-2 transition-colors bg-blue-500 text-white rounded"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}; 