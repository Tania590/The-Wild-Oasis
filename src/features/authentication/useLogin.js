import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
    mutationFn: (user) => login(user),
    onSuccess: (data) => {
      queryClient.setQueryData("user", data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { loginUser, isLoggingIn };
}
