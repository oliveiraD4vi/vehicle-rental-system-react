import {
  ArrowRightOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Carousel, notification } from "antd";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReservationContext } from "../../../context/ReservationContext";

import image1 from "../../../assets/car-example-green.png";
import image2 from "../../../assets/car-example-grey.png";
import image3 from "../../../assets/car-example-white.png";
import api from "../../../services/api";
import DateSelector from "../../DateSelector/dateSelector";

import "./home.css";

const Home = () => {
  const { vehicle } = useContext(ReservationContext);

  const [vehicleList, setVehicleList] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const images = [image1, image2, image3];

  useEffect(() => {
    if (vehicle && location.state && location.state.data) {
      navigate("/reservations");
    }
  }, [vehicle]);

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
      <div className="date-selector-container">
        <DateSelector />
      </div>

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
                  <img
                    src={images[Math.floor(Math.random() * 3)]}
                    alt="vehicle"
                  />
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
                  style={{
                    marginTop: "15px",
                    height: "auto",
                    padding: "5px 10px",
                  }}
                  className="primary-button"
                >
                  OFERTA <ArrowRightOutlined />
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      <div className="cards-container">
        <h1 className="title">
          como fazer uma
          <span> R</span>
          eserva
        </h1>

        <div className="cards">
          <div className="card">
            <div className="card-icon">
              <CalendarOutlined />
            </div>
            <Card>
              <div className="content">
                <h3>Escolha as datas</h3>
                <p>
                  você precisa nos dizer quando vai retirar o carro e quando vai
                  trazer ele de volta pra gente
                </p>
              </div>

              <Button
                className="primary-button"
                onClick={() => navigate("/cars")}
                style={{ height: "auto", padding: "5px 10px" }}
              >
                COMEÇAR <ArrowRightOutlined />
              </Button>
            </Card>
          </div>

          <div className="card">
            <div className="card-icon">
              <SearchOutlined />
            </div>
            <Card>
              <div className="content">
                <h3>Procure um carro</h3>
                <p>
                  temos uma grande gama de carros que você pode escolher,
                  verifique nossa lista!
                </p>
              </div>

              <Button
                className="primary-button"
                onClick={() => navigate("/cars")}
                style={{ height: "auto", padding: "5px 10px" }}
              >
                COMEÇAR <ArrowRightOutlined />
              </Button>
            </Card>
          </div>

          <div className="card">
            <div className="card-icon">
              <FileTextOutlined />
            </div>

            <Card>
              <div className="content">
                <h3>Preencha o form</h3>
                <p>
                  só precisamos saber algumas coisas sobre a reserva e sobre
                  você, o cliente
                </p>
              </div>

              <Button
                className="primary-button"
                onClick={() => navigate("/cars")}
                style={{ height: "auto", padding: "5px 10px" }}
              >
                COMEÇAR <ArrowRightOutlined />
              </Button>
            </Card>
          </div>

          <div className="card">
            <div className="card-icon">
              <CheckCircleOutlined />
            </div>
            <Card>
              <div className="content">
                <h3>Retire o carro</h3>
                <p>
                  ao realizar o pagamento você receberá um comprovante para
                  retirar o carro!
                </p>
              </div>

              <Button
                className="primary-button"
                onClick={() => navigate("/cars")}
                style={{ height: "auto", padding: "5px 10px" }}
              >
                COMEÇAR <ArrowRightOutlined />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
