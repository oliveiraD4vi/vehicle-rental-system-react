import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";
import notification from "../../../services/notification";
import PageHeader from "../PageHeader/pageHeader";
import Table from "../Table/table";

import "./vehicle.css";

const Vehicle = () => {
  const [disabledPagination, setDisabledPagination] = useState(false);
  const [pagination, setPagination] = useState({});
  const [dataList, setDataList] = useState(null);
  const [loading, setLoading] = useState();

  const { confirm } = Modal;

  const navigate = useNavigate();

  const getDataList = async (page, size, search) => {
    setLoading(true);
    setDataList(null);
    setDisabledPagination(true);

    try {
      const response = await api.get(
        `/vehicle/list?page=${page}&size=${size}&sort=ASC`
      );
      const { data } = response;

      setPagination({
        totalCount: data.totalCount,
        page,
        size,
        search,
      });

      if (search) {
        const list = [];
        data.cars.forEach((item) => {
          if (
            item.brand.toLowerCase().includes(search.toLowerCase()) ||
            item.model.toLowerCase().includes(search.toLowerCase())
          ) {
            list.push(item);
          }
        });
        setDataList(list);
      } else {
        setDataList(data.cars);
      }

      setLoading(false);
      setDisabledPagination(false);
    } catch ({ response }) {
      notification("error", response.data.message);
    }
  };

  const confirmDelete = (id) => {
    confirm({
      title: `Você deseja deletar esse veículo?`,
      async onOk() {
        try {
          const { data } = await api.delete(`/vehicle?id=${id}`);
          notification("success", data.message);
        } catch ({ response }) {
          notification("error", response.data.message);
        }
        getDataList(1, 5);
      },
      centered: true,
      okText: "Deletar",
      cancelText: "Cancelar",
    });
  };

  useEffect(() => {
    getDataList(1, 5);
  }, []);

  const columns = [
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      width: "20vw",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      width: "20vw",
    },
    {
      title: "Cor",
      key: "color",
      render: (record) => (
        <Tag
          className={
            record.color.toLowerCase() === "white" ? "white label" : "label"
          }
          color={record.color}
        >
          {record.color}
        </Tag>
      ),
    },
    {
      title: "Diária (R$)",
      key: "diaryValue",
      dataIndex: "value",
    },
    {
      key: "action",
      width: "5vw",
      render: (record) => (
        <div key={record.id} className="action-column">
          <Button
            type="primary"
            className="delete-button"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(record.id);
            }}
          />

          <Button
            type="primary"
            className="add-button"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/admin/vehicles/data");
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="vehicles-container">
      <PageHeader title="Veículos" />
      {dataList && (
        <Table
          dataList={dataList}
          getDataList={getDataList}
          pagination={pagination}
          setPagination={setPagination}
          disabledPagination={disabledPagination}
          loading={loading}
          setLoading={setLoading}
          columns={columns}
          goPath="/admin/vehicles/data"
          searchPlaceholder="Pesquisar por marca ou modelo"
        />
      )}
    </div>
  );
};

export default Vehicle;
