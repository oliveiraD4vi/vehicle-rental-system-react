import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Carousel, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Image from "../../assets/car-example-green.png";
import api from "../../services/api";

import "./home.css";

const Home = () => {
  const [vehicleList, setVehicleList] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/vehicle/list/random");

        const { data } = response;
        setVehicleList(data.randomList);
      } catch (error) {
        const { data } = error.response;

        notification("error", data.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-container">
      {vehicleList && (
        <div className="carrousel-container">
          <h1 className="title">
            mais
            <span> R</span>
            entáveis
          </h1>

          <Carousel autoplay>
            {vehicleList.map((vehicle) => (
              <div className="vehicle-container" key={vehicle.plate}>
                <div>
                  <img src={Image} alt="green vehicle" />
                </div>
                <h3>
                  {vehicle.brand} {vehicle.model}
                </h3>
                <span>2020</span>
                <Button
                  onClick={() =>
                    navigate("/reservations", {
                      state: {
                        data: vehicle,
                      },
                    })
                  }
                  style={{ marginTop: "15px", height: "auto", padding: "5px 10px" }}
                  className="primary-button"
                >
                  OFERTA <ArrowRightOutlined />
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Home;
