import { ITask } from '../../../slice';

export const fetchTasks = async (date: string): Promise<ITask[]> => {
  const localTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  return localTasks[date];
};