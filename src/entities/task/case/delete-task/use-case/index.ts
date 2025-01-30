import { deleteTask } from '../../../slice';

export const removeTask = (date: string, taskId: number): Promise<void> => {
  return new Promise((resolve) => {
    deleteTask(date, taskId);
    resolve();
  });
};