export interface TaskDetail {
  taskId: number;
  taskName: string;
  description: string;
  priorityTask: {
    priority: string;
  };
  taskTypeDetail: {
    taskType: string;
  };
  statusName: string;
  statusId: number;
  assigness: Array<{
    id: number;
    name: string;
    avatar: string;
  }>;
}
