import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ReservationContext = createContext({});

export function ReservationProvider({ children }) {
  const [reservationData, setReservationData] = useState();
  const [vehicle, setVehicle] = useState();

  const value = {
    reservationData,
    setReservationData,
    vehicle,
    setVehicle,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

ReservationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
