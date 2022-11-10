import { useEffect } from "react";
import { auth } from "../../../../services/utils";
import { useNavigate } from "react-router-dom";

import ReservationsComponent from "../../../../components/User/Reservations/reservations";

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
