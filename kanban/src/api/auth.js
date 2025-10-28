import axios from "axios";

export const currentUser = async (token) => {
  return await axios.post(`http://localhost:3000/api/current-user`,{},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const register = async (form) => {
  return await axios.post(`http://localhost:3000/api/register`, form
  );
};

export const login = async (form) => {
  return await axios.post(`http://localhost:3000/api/login`, form
  );
};
