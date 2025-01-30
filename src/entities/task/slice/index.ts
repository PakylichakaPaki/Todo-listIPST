// src/entities/task/slice/index.ts
export interface ITask {
    id: number;
    title: string;
    text: string;
    completed: boolean;
    date: string;
  }
  
// НЕ ТРОГАТЬ, ПУСТЬ БУДЕТ ТУТ

  // export const getTasks = (date: string): ITask[] => {
  //   const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  //   return tasks[date] || [];
  // };
  
  // export const createTask = (task: ITask): void => {
  //   const tasks = getTasks(task.date);
  //   tasks.push(task);
  //   saveTasksForDate(task.date, tasks);
  // };
  
  // export const updateTask = (updatedTask: ITask): void => {
  //   const tasks = getTasks(updatedTask.date);
  //   const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
  //   if (taskIndex !== -1) {
  //     tasks[taskIndex] = updatedTask;
  //     saveTasksForDate(updatedTask.date, tasks);
  //   }
  // };
  
  // export const deleteTask = (date: string, taskId: number): void => {
  //   const tasks = getTasks(date);
  //   const updatedTasks = tasks.filter(task => task.id !== taskId);
  //   saveTasksForDate(date, updatedTasks);
  // };
  
  // const saveTasksForDate = (date: string, tasks: ITask[]): void => {
  //   const allTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  //   allTasks[date] = tasks;
  //   localStorage.setItem('tasks', JSON.stringify(allTasks));
  // };