import { ArrowRightOutlined } from "@ant-design/icons";
import { auth } from "../../../services/utils";
import { Button, Tooltip } from "antd";
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
        <h3>
          {data.brand} {data.model}
        </h3>
        <h3 id="value">R$ {data.value},00</h3>

        {auth.isAuthenticated() ? (
          <Button
            className="offer-button"
            onClick={() =>
              navigate("/reservations", {
                state: {
                  data: data,
                },
              })
            }
          >
            OFERTA <ArrowRightOutlined />
          </Button>
        ) : (
          <Tooltip title="Faça login para alugar um carro" placement="bottom">
            <Button className="offer-tooltip" disabled={true}>
              OFERTA <ArrowRightOutlined />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Car;
