import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewTask } from '../use-case';
import { ITask } from '../../../slice';

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNewTask,
    onSuccess: (newTask: ITask) => {
      // Немедленно обновляем кэш
      queryClient.setQueryData<ITask[]>(['tasks', newTask.date], (oldTasks = []) => 
        [...oldTasks, newTask]
      );
      // Инвалидируем кэш для последующей синхронизации
      queryClient.invalidateQueries({ queryKey: ['tasks', newTask.date] });
    },
  });
};