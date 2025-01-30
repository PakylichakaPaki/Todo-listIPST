import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../use-case';
import { ITask } from '../../../slice';

export const useTasks = (date: string) => {
  return useQuery<ITask[]>({
    queryKey: ['tasks', date],
    queryFn: () => fetchTasks(date),
  });
};