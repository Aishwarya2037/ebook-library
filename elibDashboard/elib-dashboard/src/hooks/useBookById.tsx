import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../api/axios";

const useBookById = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });
};

export default useBookById;
