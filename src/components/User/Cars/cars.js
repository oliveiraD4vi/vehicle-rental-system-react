import { useContext, useEffect, useState } from "react";
import { Input, Pagination, Select } from "antd";
import { ReservationContext } from "../../../context/ReservationContext";

import notification from "../../../services/notification";
import DateSelector from "../../DateSelector/dateSelector";
import image1 from "../../../assets/car-example-green.png";
import image2 from "../../../assets/car-example-grey.png";
import image3 from "../../../assets/car-example-white.png";
import api from "../../../services/api";
import Car from "./Car/car";

import "./cars.css";

const Cars = () => {
  const { reservationData } = useContext(ReservationContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [disabled, setDisabled] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [pagination, setPagination] = useState();
  const [totalCount, setTotalCount] = useState();

  const { Search } = Input;
  const { Option } = Select;

  const images = [image1, image2, image3];

  useEffect(() => {
    async function fetchData() {
      if (reservationData) {
        setLoading(true);
        setDisabled(true);

        setPagination({ page: 1, size: 4, sort: "ASC" });
        getData(1, 4, "ASC");
      }
    }

    fetchData();
  }, [reservationData]);

  const getData = async (page, size, sort) => {
    try {
      const response = await api.get(
        `/vehicle/list?page=${page}&size=${size}&sort=${sort}`
      );

      const { data } = response;
      setData(data.cars);
      setTotalCount(data.totalCount);

      setLoading(false);
      setDisabled(false);
    } catch (error) {
      const { data } = error.response;

      notification("error", data.message);
    }
  };

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

  const onChangeSelect = (sort) => {
    setPagination({ ...pagination, sort });
    getData(pagination.page, pagination.size, sort);
  };

  const onChangePagination = (page, size) => {
    setPagination({ ...pagination, page, size });
    getData(page, size, pagination.sort);
  };

  return loading ? (
    <span>Carregando...</span>
  ) : !reservationData ? (
    <DateSelector />
  ) : (
    <div className="cars-container">
      <DateSelector data={reservationData} />

      <div className="search-container">
        <Search
          className="search-input"
          placeholder="Pesquisar por marca ou modelo"
          onSearch={(value) => handleSearch(value)}
          onChange={(value) => handleSearch(value)}
          loading={loading}
        />
      </div>

      <div className="pagination-container">
        {pagination && (
          <Pagination
            locale={{ items_per_page: ` /  página` }}
            showSizeChanger
            current={pagination.page}
            defaultPageSize={pagination.size}
            total={totalCount}
            onChange={onChangePagination}
            disabled={disabled}
            pageSizeOptions={["4", "12", "20", "28"]}
          />
        )}

        <div className="sorter">
          <span>Ordem:</span>

          <Select defaultValue="ASC" onChange={onChangeSelect}>
            <Option value="ASC">Crescente</Option>
            <Option value="DESC">Decrescente</Option>
          </Select>
        </div>
      </div>

      <div className="viewer-container">
        <div className="container-listing">
          {data &&
            data
              .filter(filterSearch)
              .map((item) => (
                <Car
                  key={item.plate}
                  data={item}
                  img={images[Math.floor(Math.random() * 3)]}
                />
              ))}
        </div>
      </div>

      {/* {pagination && (
        <Pagination
          locale={{ items_per_page: ` /  página` }}
          showSizeChanger
          current={pagination.page}
          defaultPageSize={pagination.size}
          total={totalCount}
          onChange={onChangePagination}
          disabled={disabled}
          pageSizeOptions={["4", "12", "20", "28"]}
        />
      )} */}
    </div>
  );
};

export default Cars;
