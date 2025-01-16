import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((accu, curr) => accu + curr.totalPrice, 0);
  const checkins = confirmedStays.length;

  const occupation =
    (confirmedStays.reduce((accu, curr) => accu + curr.numNights, 0) * 100) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        color="blue"
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
      />
      <Stat
        color="green"
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
      />
      <Stat
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins}
      />
      <Stat
        color="yellow"
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation) + "%"}
      />
    </>
  );
}

export default Stats;
