export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "PENDING" | "COMPLETED" | "OVERDUE";
  priority: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedTasks = {
  message: string;
  tasks: Task[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalTasks: number;
  };
};

export type TasksCount = {
  message: string;
  counts: {
    pending: number;
    completed: number;
    overdue: number;
  };
};
