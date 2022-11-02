import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import image1 from "../../../../../assets/car-example-green.png";
import image2 from "../../../../../assets/car-example-grey.png";
import image3 from "../../../../../assets/car-example-white.png";

import DataComponent from "../../../../../components/Admin/Data/data";

import "./data.css";

const Data = () => {
  const [vehicleData, setVehicleData] = useState();

  const images = [image1, image2, image3];

  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) setVehicleData(state.data);
  }, [state]);

  return (
    <div className="page-container">
      {vehicleData ? (
        <DataComponent>
          <div className="card">
            <img
              src={images[Math.floor(Math.random() * 3)]}
              alt="vehicle"
              width={200}
            />

            <div className="info">
              <span>
                Marca: <p>{vehicleData.brand}</p>
              </span>
              <span>
                Modelo: <p>{vehicleData.model}</p>
              </span>
            </div>

            <div className="info">
              <span>
                Cor:{" "}
                <p
                  style={{
                    color:
                      vehicleData.color != "White"
                        ? vehicleData.color
                        : "black",
                  }}
                >
                  {vehicleData.color}
                </p>
              </span>
              <span>
                Placa: <p>{vehicleData.plate}</p>
              </span>
            </div>

            <div className="info">
              <span>
                Diária: <p>{vehicleData.value}</p>
              </span>
            </div>
          </div>
        </DataComponent>
      ) : (
        <span>Carregando...</span>
      )}
    </div>
  );
};

export default Data;
