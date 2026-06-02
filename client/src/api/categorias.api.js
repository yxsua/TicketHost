import axiosClient from "./axiosClient";

export const obtenerCategorias = async () => {
  const response = await axiosClient.get("/categorias");

  return response.data.data;
};

export const crearCategoria = async (data) => {
  const response = await axiosClient.post("/categorias", data);

  return response.data;
};

export const actualizarCategoria = async (id, data) => {
  const response = await axiosClient.put(`/categorias/${id}`, data);

  return response.data;
};

export const eliminarCategoria = async (id) => {
  const response = await axiosClient.delete(`/categorias/${id}`);

  return response.data;
};
