import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "../../features/dashboard/Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from "react";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

export default function DashboardLayout() {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoadingStays, numDays } = useRecentStays();
  const { cabins, isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedStays || []}
        numDays={numDays}
        cabinCount={(cabins || []).length}
      />
      {/* TODO: Check why charts don't show up */}
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays || []} />
      <SalesChart bookings={bookings || []} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
