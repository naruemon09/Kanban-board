import axios from "axios";

export const createColumn = async (token, form) => {
  return await axios.post(`http://localhost:3000/api/createColumn`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listColumn = async (token, id) => {
  return await axios.get(`http://localhost:3000/api/listColumn/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readColumn = async (token, id) => {
  return await axios.get(`http://localhost:3000/api/readColumn/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeColumn = async (token, id) => {
  return await axios.delete(`http://localhost:3000/api/deleteColumn/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateColumn = async (token, id, form) => {
  return await axios.put(`http://localhost:3000/api/updateColumn/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
