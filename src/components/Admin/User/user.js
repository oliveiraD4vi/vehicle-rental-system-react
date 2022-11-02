import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";

import api from "../../../services/api";
import notification from "../../../services/notification";
import PageHeader from "../PageHeader/pageHeader";
import Table from "../Table/table";

import "./user.css";

const User = () => {
  const [disabledPagination, setDisabledPagination] = useState(false);
  const [pagination, setPagination] = useState({});
  const [dataList, setDataList] = useState(null);
  const [loading, setLoading] = useState();

  const { confirm } = Modal;

  const getDataList = async (page, size, search) => {
    setLoading(true);
    setDataList(null);
    setDisabledPagination(true);

    try {
      const response = await api.get(
        `/user/list?page=${page}&size=${size}&sort=ASC`
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
          const { data } = await api.delete(`/user/delete?id=${id}`);
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
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "20vw",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20vw",
    },
    {
      title: "Tipo",
      key: "role",
      dataIndex: "role",
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
        </div>
      ),
    },
  ];

  return !dataList ? (
    <span>Carregando...</span>
  ) : (
    <div className="users-container">
      <PageHeader title="Usuários" />
      <Table
        dataList={dataList}
        getDataList={getDataList}
        pagination={pagination}
        setPagination={setPagination}
        disabledPagination={disabledPagination}
        loading={loading}
        setLoading={setLoading}
        columns={columns}
        goPath="/admin/users/data"
        lastPath="/admin/users"
      />
    </div>
  );
};

export default User;
