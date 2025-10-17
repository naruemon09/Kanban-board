import axios from "axios";

export const createColumn = async (token, form) => {
  return await axios.post("http://localhost:3000/api/createBoard", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listColumn = async (token) => {
  return await axios.get("http://localhost:3000/api/listBoard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readColumn = async (token, id) => {
  return await axios.get("http://localhost:3000/api/readBoard/"+ id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeColumn = async (token, id) => {
  return await axios.delete("http://localhost:3000/api/deleteBoard/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateColumn = async (token, form) => {
  return await axios.put("http://localhost:3000/api/updateBoard", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
