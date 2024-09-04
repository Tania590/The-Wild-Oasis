import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (id) =>
      updateBooking(
        {
          isPaid: true,
          status: "checked-in",
        },
        id
      ),

    onSuccess: (data) => {
      toast.success(`Booking #${data[0].id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });
  return { checkin, isCheckingIn };
}
