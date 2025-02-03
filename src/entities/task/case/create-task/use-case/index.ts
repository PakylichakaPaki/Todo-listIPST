import { ITask } from '../../../slice';

interface CreateTaskParams {
  title: string;
  text: string;
  date: string;
}

export const createNewTask = async (params: CreateTaskParams): Promise<ITask> => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  const tasksForDate = storedTasks[params.date] || [];
  
  const newTask: ITask = {
    id: Date.now(),
    title: params.title,
    text: params.text,
    completed: false,
    date: params.date
  };

  storedTasks[params.date] = [...tasksForDate, newTask];
  localStorage.setItem('tasks', JSON.stringify(storedTasks));

  return newTask;
};