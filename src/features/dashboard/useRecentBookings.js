import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data } = useQuery({
    queryKey: ["bookings", numDays],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoading, data, numDays };
}
