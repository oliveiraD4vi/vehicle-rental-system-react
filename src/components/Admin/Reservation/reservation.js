import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";

import api from "../../../services/api";
import notification from "../../../services/notification";
import PageHeader from "../PageHeader/pageHeader";
import Table from "../Table/table";

import "./reservation.css";

const Reservation = () => {
  const [disabledPagination, setDisabledPagination] = useState(false);
  const [pagination, setPagination] = useState({});
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState();

  const { confirm } = Modal;

  const getDataList = async (page, size, search) => {
    setLoading(true);
    setDataList(null);
    setDisabledPagination(true);

    try {
      const response = await api.get(
        `/reservation/list?page=${page}&size=${size}&sort=ASC`
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
        data.reservations.forEach((item) => {
          if (item.user_id == search || item.vehicle_id == search) {
            list.push(item);
          }
        });
        setDataList(list);
      } else {
        setDataList(data.reservations);
      }

      setLoading(false);
      setDisabledPagination(false);
    } catch ({ response }) {
      notification("error", response.data.message);
    }
  };

  const confirmDelete = (id) => {
    confirm({
      title: `Você deseja deletar essa reserva?`,
      async onOk() {
        try {
          const { data } = await api.delete(`/reservation?id=${id}`);
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
      title: "Usuário",
      key: "userid",
      dataIndex: "user_id",
    },
    {
      title: "Veículo",
      key: "vehicleid",
      dataIndex: "vehicle_id",
    },
    {
      title: "Retirada",
      key: "pickup",
      render: (record) => moment(record.pickup).format("DD/MM/YY"),
    },
    {
      title: "Devolução",
      key: "devolution",
      render: (record) => moment(record.devolution).format("DD/MM/YY"),
    },
    {
      title: "Passo",
      key: "step",
      dataIndex: "step",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      key: "action",
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
        </div>
      ),
    },
  ];

  return (
    <div className="reservations-container">
      <PageHeader title="Reservas" goBackHome />
      <Table
        dataList={dataList}
        getDataList={getDataList}
        pagination={pagination}
        setPagination={setPagination}
        disabledPagination={disabledPagination}
        loading={loading}
        setLoading={setLoading}
        columns={columns}
        goPath="/admin/reservations/data"
        searchPlaceholder="Pesquisar por id do usuário ou do veículo"
      />
    </div>
  );
};

export default Reservation;
