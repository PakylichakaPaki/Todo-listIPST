import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewTask } from '../use-case';

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};