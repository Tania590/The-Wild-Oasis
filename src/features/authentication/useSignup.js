import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupUser } from "../../services/apiAuth";

export function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });
  return { mutate, isPending };
}
