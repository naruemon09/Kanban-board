import axios from "axios";

export const addMember = async (token, form) => {
  return await axios.post(`http://localhost:3000/api/addMember`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listMember = async (token , id) => {
  return await axios.get(`http://localhost:3000/api/listMember/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchUserByEmail = async (token , form) => {
  return await axios.get(`http://localhost:3000/api/user?email=${encodeURIComponent(form)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchUserByEmailInBoard = async (token , form , id) => {
  return await axios.get(`http://localhost:3000/api/userInBoard/${id}?email=${encodeURIComponent(form)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};