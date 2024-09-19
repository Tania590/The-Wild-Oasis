import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("login/", { replace: true });
      queryClient.removeQueries();
    },
  });
  return { logout, isPending };
}
