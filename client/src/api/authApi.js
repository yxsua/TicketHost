import axiosClient from "./axiosClient";

export const loginCliente = async (email, password) => {
  const response = await axiosClient.post("/auth/clientes/login", {
    email,
    password,
  });

  return {
    token: response.data.data.token,
    user: {
      ...response.data.data.usuario,
      tipo: "cliente",
    },
  };
};

export const loginAgente = async (email, password) => {
  const response = await axiosClient.post("/auth/agentes/login", {
    email,
    password,
  });

  return {
    token: response.data.data.token,
    user: {
      ...response.data.data.usuario,
      tipo: "agente",
    },
  };
};

export const loginAdmin = async (email, password) => {
  const response = await axiosClient.post("/auth/admin/login", {
    email,
    password,
  });

  return {
    token: response.data.token,
    user: {
      ...response.data.usuario,
      tipo: "admin",
    },
  };
};
