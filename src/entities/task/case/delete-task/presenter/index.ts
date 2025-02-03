import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTask } from '../use-case';
import { ITask } from '../../../slice';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ date, taskId }: { date: string, taskId: number }) => removeTask(date, taskId),
    onSuccess: (_, { date, taskId }) => {
      // Немедленно обновляем кэш
      queryClient.setQueryData<ITask[]>(['tasks', date], (oldTasks = []) => 
        oldTasks.filter(task => task.id !== taskId)
      );
      // Инвалидируем кэш для последующей синхронизации
      queryClient.invalidateQueries({ queryKey: ['tasks', date] });
    },
  });
};