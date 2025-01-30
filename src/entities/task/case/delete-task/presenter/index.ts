import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTask } from '../use-case';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ date, taskId }: { date: string, taskId: number }) => removeTask(date, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};