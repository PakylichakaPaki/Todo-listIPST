// src/entities/task/case/create-task/use-case/index.ts
import { ITask, createTask } from '../../../slice';

export const createNewTask = (task: ITask): Promise<void> => {
  return new Promise((resolve) => {
    createTask(task);
    resolve();
  });
};