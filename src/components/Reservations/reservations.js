import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./reservations.css";

const Reservations = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state.data) console.log(location.state.data);
  }, []);

  return <div className="reservations-container">Reservations</div>;
};

export default Reservations;
