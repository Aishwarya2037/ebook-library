import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../api/axios";

const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
};

export default useDeleteBook;
