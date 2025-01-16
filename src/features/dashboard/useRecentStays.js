import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data } = useQuery({
    queryKey: ["stays", numDays],

    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = data?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, confirmedStays };
}
