import api from "@/utils/axios";

export const getAllTasks = async (
  page = 1,
  pageSize = 10,
  title: string | undefined,
  status: string | undefined
) => {
  try {
    const response = await api.get(`/tasks`, {
      params: {
        title,
        status,
        page,
        pageSize,
      },
    });

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getTasksCount = async () => {
  try {
    const response = await api.get("/tasks/count");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createTask = async (data: any) => {
  try {
    const response = await api.post("/tasks", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`tasks/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

type UpdateProps = {
  id: string;
  taskData: any;
};

export const updateTask = async (props: UpdateProps) => {
  try {
    const response = await api.put(`tasks/${props.id}`, props.taskData);

    return response;
  } catch (error: any) {
    return error;
  }
};
