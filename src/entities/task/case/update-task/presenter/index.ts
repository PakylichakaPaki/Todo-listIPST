// src/entities/task/case/update-task/presenter/index.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExistingTask } from '../use-case';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExistingTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};