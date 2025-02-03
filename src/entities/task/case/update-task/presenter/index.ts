import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExistingTask } from '../use-case';
import { ITask } from '../../../slice';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation<ITask, Error, ITask>({
    mutationFn: updateExistingTask,
    onSuccess: (updatedTask) => {
      // Немедленно обновляем кэш
      queryClient.setQueryData<ITask[]>(['tasks', updatedTask.date], (oldTasks = []) => 
        oldTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      // Инвалидируем кэш для последующей синхронизации
      queryClient.invalidateQueries({ queryKey: ['tasks', updatedTask.date] });
    },
  });

  const toggleTaskCompletion = (taskId: number) => {
    const tasks = queryClient.getQueryData<ITask[]>(['tasks']) || [];
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      mutation.mutate({ ...task, completed: !task.completed });
    }
  };

  return {
    ...mutation,
    toggleTaskCompletion
  };
};