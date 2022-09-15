import { useEffect, useState } from "react";

import WhiteCar from "../../assets/car-example-white.png";

import api from "../../services/api";
import Car from "./Car/car";

import "./cars.css";

const Cars = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await api.get("/vehicle/list");

        const { data } = response;
        setData(data.cars);
        setLoading(false);
      } catch (error) {
        // alert('deu errado');
        fetchData();
      }
    }

    fetchData();
  }, []);

  return loading ? (
    <span>Carregando...</span>
  ) : (
    <div className="cars-container">
      {data &&
        data.map((item) => <Car key={item.plate} data={item} img={WhiteCar} />)}
    </div>
  );
};

export default Cars;
