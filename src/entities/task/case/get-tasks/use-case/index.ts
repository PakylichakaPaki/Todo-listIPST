import { ITask } from '../../../slice';



export const fetchTasks = async (date: string): Promise<ITask[]> => {
  console.log('Fetching tasks for date:', date);
  const localTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  console.log('Tasks from localStorage:', localTasks[date]);
  return localTasks[date];
};