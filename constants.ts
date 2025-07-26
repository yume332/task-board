
import { TaskStatus } from './types';

export const STATUS_OPTIONS: TaskStatus[] = [
  TaskStatus.NOT_STARTED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.COMPLETED,
];

export const STATUS_COLORS: { [key in TaskStatus]: string } = {
  [TaskStatus.NOT_STARTED]: 'bg-gray-200 text-gray-800',
  [TaskStatus.IN_PROGRESS]: 'bg-yellow-200 text-yellow-800',
  [TaskStatus.COMPLETED]: 'bg-green-200 text-green-800',
};
