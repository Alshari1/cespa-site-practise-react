import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, fetchBlog, fetchCommittee } from "../Api/Api";
import { useAuth } from "../contexts/AuthContext";



export const useCommittee = () => {
  const { user } = useAuth()
  return useQuery({
    queryKey: ["committee"],
    queryFn: () => fetchCommittee(user),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
export const useBlog = () => {
  const { user } = useAuth()
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchBlog(user),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDeleteBlog = () => {
  // const { user } = useAuth()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteBlog(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};