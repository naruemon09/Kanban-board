import axios from "axios";

export const createTask = async (token, form) => {
  return await axios.post(`http://localhost:3000/api/createTask`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listTask = async (token, id) => {
  return await axios.get(`http://localhost:3000/api/listTask/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readTask = async (token, id) => {
  return await axios.get(`http://localhost:3000/api/readTask/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeTask = async (token, id) => {
  return await axios.delete(`http://localhost:3000/api/deleteTask/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (token, id, form) => {
  return await axios.put(`http://localhost:3000/api/updateTask/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
