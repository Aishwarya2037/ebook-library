// import axios from "axios";

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Get books with pagination and search
// export const getBooks = async (page: number, search: string) => {
//   const response = await api.get(
//     `/books?page=${page}&limit=5&search=${encodeURIComponent(search)}`,
//   );

//   return response.data;
// };

// // Get single book
// export const getBookById = async (id: string) => {
//   const response = await api.get(`/books/${id}`);
//   return response.data;
// };

// // Update book
// export const updateBook = async ({
//   id,
//   formData,
// }: {
//   id: string;
//   formData: FormData;
// }) => {
//   const response = await api.put(`/books/${id}`, formData);
//   return response.data;
// };

// // Delete book
// export const deleteBook = async (id: string) => {
//   const response = await api.delete(`/books/${id}`);
//   return response.data;
// };

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Automatically attach JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Admin login
export const loginAdmin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

// Get books with pagination and search
export const getBooks = async (page: number, search: string) => {
  const response = await api.get(
    `/books?page=${page}&limit=5&search=${encodeURIComponent(search)}`,
  );

  return response.data;
};

// Get single book
export const getBookById = async (id: string) => {
  const response = await api.get(`/books/${id}`);

  return response.data;
};

// Update book
export const updateBook = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await api.put(`/books/${id}`, formData);

  return response.data;
};

// Delete book
export const deleteBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);

  return response.data;
};
