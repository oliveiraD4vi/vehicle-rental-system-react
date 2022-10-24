import { ArrowRightOutlined } from "@ant-design/icons";
import { auth } from "../../../../services/utils";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./car.css";

const Car = ({ data, img }) => {
  const navigate = useNavigate();

  return (
    <div className="car-container">
      <div className="image-container">
        <img src={img} alt="white car" />
      </div>

      <div className="content">
        <div className="car-title">
          <h1>
            {data.brand} {data.model}
          </h1>
          <h1 id="value">R$ {data.value},00</h1>
        </div>
        <Button
          className="offer-button"
          onClick={() => {
            if (!auth.isAuthenticated()) {
              navigate("/login", {
                state: {
                  data: data,
                },
              });
            } else {
              navigate("/reservations", {
                state: {
                  data: data,
                },
              });
            }
          }}
        >
          OFERTA <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Car;
