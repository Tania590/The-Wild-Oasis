import styled from "styled-components";
import {
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),

    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, booking.created_at))
        .reduce((accu, curr) => accu + curr.totalPrice, 0),

      extrasSales: bookings
        .filter((booking) => isSameDay(date, booking.created_at))
        .reduce((accu, curr) => accu + curr.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",

        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
            unit="$"
            name="Total sales"
            fill={colors.totalSales.fill}
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            strokeWidth={2}
            unit="$"
            name="Extras sales"
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
