import axios from "axios";

export const api = axios.create({
  baseURL: "https://ebook-library-wbmv.onrender.com/api",
  // baseURL: "http://localhost:3100/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// get all books without pagination
// export const getBooks = async () => {
//   const response = await api.get("/books");
//   return response.data;
// };

// with pagination
export const getBooks = async (page: number, search: string) => {
  const response = await api.get(
    `/books?page=${page}&limit=5&search=${search}`,
  );
  return response.data;
};

// get single book
export const getBookById = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// put
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
