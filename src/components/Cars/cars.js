import { useEffect, useState } from "react";
import { Input } from "antd";

import notification from "../../services/notification";
import WhiteCar from "../../assets/car-example-white.png";
import api from "../../services/api";
import Car from "./Car/car";

import "./cars.css";

const Cars = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [searchValue, setSearchValue] = useState(null);

  const { Search } = Input;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await api.get("/vehicle/list");

        const { data } = response;
        setData(data.cars);
        setLoading(false);
      } catch (error) {
        const { data } = error.response;

        notification("error", data.message);
        fetchData();
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filterSearch = (item) => {
    if (
      searchValue === "" ||
      searchValue === " " ||
      searchValue === null ||
      item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.model.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return item;
    }
  };

  return loading ? (
    <span>Carregando...</span>
  ) : (
    <div className="cars-container">
      <div className="search-container">
        <Search
          className="search-input"
          placeholder="Pesquisar por nome da marca ou modelo"
          onSearch={(value) => handleSearch(value)}
          onChange={(value) => handleSearch(value)}
          loading={loading}
        />
      </div>

      <div className="container-listing">
        {data &&
          data
            .filter(filterSearch)
            .map((item) => <Car key={item.plate} data={item} img={WhiteCar} />)}
      </div>
    </div>
  );
};

export default Cars;
