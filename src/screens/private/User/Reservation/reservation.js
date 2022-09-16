import { useEffect } from "react";
import { auth } from "../../../../services/utils";

import ReservationsComponent from "../../../../components/Reservations/reservations";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="page-container">
      <ReservationsComponent />
    </div>
  );
};

export default Reservation;
