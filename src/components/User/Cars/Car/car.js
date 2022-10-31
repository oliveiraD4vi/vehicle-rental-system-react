import { ArrowRightOutlined } from "@ant-design/icons";
import { auth } from "../../../../services/utils";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ReservationContext } from "../../../../context/ReservationContext";

import "./car.css";

const Car = ({ data, img }) => {
  const { setVehicle } = useContext(ReservationContext);

  const navigate = useNavigate();

  return (
    <div className="car-container">
      <h1>{data.brand} {data.model}</h1>

      <img src={img} alt="white car" />

      <Button
        className="offer-button"
        onClick={() => {
          if (!auth.isAuthenticated()) {
            setVehicle(data);
            navigate("/login", {
              state: {
                data: data,
              },
            });
          } else {
            setVehicle(data);
            navigate("/reservations", {
              state: {
                data: data,
              },
            });
          }
        }}
      >
        <span id="value">R$ {data.value},00</span>
        OFERTA <ArrowRightOutlined />
      </Button>
    </div>
  );
};

export default Car;
