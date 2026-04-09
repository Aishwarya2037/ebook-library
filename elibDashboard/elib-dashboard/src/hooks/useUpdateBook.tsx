import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../api/axios";

type UpdateBookPayload = {
  id: string;
  formData: FormData;
};

const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdateBookPayload) =>
      updateBook({ id, formData }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      queryClient.invalidateQueries({
        queryKey: ["book", variables.id],
      });
    },

    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
};

export default useUpdateBook;
