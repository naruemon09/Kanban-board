import axios from "axios";

export const createBoard = async (token, form) => {
  return await axios.post(`http://localhost:3000/api/createBoard`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listBoard = async (token) => {
  return await axios.get(`http://localhost:3000/api/listBoard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readBoard = async (token, id) => {
  return await axios.get(`http://localhost:3000/api/readBoard/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeBoard = async (token, id) => {
  return await axios.delete(`http://localhost:3000/api/deleteBoard/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBoard = async (token, id, form) => {
  return await axios.put(`http://localhost:3000/api/updateBoard/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
