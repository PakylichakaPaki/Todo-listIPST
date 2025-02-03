import { ITask } from '../../../slice';

interface UpdateTaskParams {
  id: number;
  title: string;
  text: string;
  completed: boolean;
  date: string;
}

export const updateExistingTask = async (params: UpdateTaskParams): Promise<ITask> => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  const tasksForDate = storedTasks[params.date] || [];
  
  const updatedTasks = tasksForDate.map((task: ITask) => 
    task.id === params.id ? { ...task, ...params } : task
  );

  storedTasks[params.date] = updatedTasks;
  localStorage.setItem('tasks', JSON.stringify(storedTasks));

  return params;
};