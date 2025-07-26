
export enum TaskStatus {
  NOT_STARTED = '未着手',
  IN_PROGRESS = '確認中',
  COMPLETED = '完了',
}

export interface Task {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
  status: TaskStatus;
  remarks?: string;
}
