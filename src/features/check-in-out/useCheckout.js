import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(
        {
          status: "checked-out",
        },
        id
      ),
    onSuccess: (data) => {
      toast.success(`Booking #${data[0].id} suceessfully checked out`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}
