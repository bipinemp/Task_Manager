import api from "@/utils/axios";

export const registerUser = async (data: any) => {
  try {
    const response = await api.post("users/register", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await api.post("users/login", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("users/logout");
    return response;
  } catch (error: any) {
    return error;
  }
};
