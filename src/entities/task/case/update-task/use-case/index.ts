// src/entities/task/case/update-task/use-case/index.ts
import { ITask, updateTask } from '../../../slice';

export const updateExistingTask = (task: ITask): Promise<void> => {
  return new Promise((resolve) => {
    updateTask(task);
    resolve();
  });
};