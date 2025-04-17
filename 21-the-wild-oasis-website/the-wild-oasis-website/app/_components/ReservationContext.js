"use client";

import { addDays } from "date-fns";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };
// const initialState = { from: new Date(), to: addDays(new Date(), 10) };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === "undefiend") {
    throw new Error("Context was used outside of provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
