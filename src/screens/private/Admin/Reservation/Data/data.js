import { Button, Form, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DataComponent from "../../../../../components/Admin/Data/data";
import api from "../../../../../services/api";
import notification from "../../../../../services/notification";

const Data = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [insert, setInsert] = useState(false);
  const [reservationData, setReservationData] = useState();

  // const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();

  const { state } = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setDisabled(true);

    try {
      if (state && state.data) {
        await api.put("/reservation", { ...data, id: state.data.id });
      } else {
        await api.post("/reservation", data);
      }

      setLoading(false);
      setDisabled(false);

      notification("success", "Operação realizada com sucesso!");
      navigate("/admin/reservations");
    } catch ({ response }) {
      setLoading(false);
      setDisabled(false);

      notification("error", response.data.message);
    }
  };

  useEffect(() => {
    if (state && state.data) {
      setReservationData(state.data);
    } else {
      setInsert(true);
    }
  }, [state]);

  const onChange = (checked) => {
    if (checked) {
      setInsert(true);
      setReservationData(null);
    } else {
      setInsert(false);
      setReservationData(state.data);
    }
  };

  return (
    <div className="page-container">
      <DataComponent title={state && state.data ? "Dados" : "Inserir veículo"}>
        {state && (
          <div className="editor-switch">
            <span>EDIÇÃO: </span>
            <Switch onChange={onChange} />
          </div>
        )}
        {reservationData ? (
          <div className="cards-container">
            <div className="card">reserva</div>
            <div className="card">usuário</div>
            <div className="card">veículo</div>
          </div>
        ) : insert ? (
          <Form form={form} className="form-container" onFinish={onSubmit}>
            <h4>Reserva</h4>
            <div className="form-group-2">
              <Form.Item
                name="status"
                label={
                  <>
                    <span className="label-name"> Status </span>
                  </>
                }
                initialValue={
                  state && state.data ? state.data.status : "CREATED"
                }
                rules={[
                  {
                    required: true,
                    message: "Escolha o STATUS da reserva",
                  },
                ]}
              >
                <Select
                  disabled={disabled}
                  showSearch
                  placeholder="Status"
                  optionFilterProp="children"
                  options={[
                    {
                      value: "CREATED",
                      label: "Reserva criada",
                    },
                    {
                      value: "CONFIRMED",
                      label: "Reserva confirmada",
                    },
                    {
                      value: "PICKUP",
                      label: "Veículo retirado",
                    },
                    {
                      value: "FINALIZED",
                      label: "Reserva finalizada",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="step"
                label={
                  <>
                    <span className="label-name"> Passo </span>
                  </>
                }
                initialValue={state && state.data ? state.data.step : "CLIENT"}
                rules={[
                  {
                    required: true,
                    message:
                      "Escolha o passo em que se encontra o formulário de reserva",
                  },
                ]}
              >
                <Select
                  disabled={disabled}
                  showSearch
                  placeholder="Passo"
                  optionFilterProp="children"
                  options={[
                    {
                      value: "PERSONAL",
                      label: "Dados pessoais",
                    },
                    {
                      value: "VEHICLE",
                      label: "Confirmação do veículo",
                    },
                    {
                      value: "PAYMENT",
                      label: "Pagamento",
                    },
                    {
                      value: "CONCLUDED",
                      label: "Concluído",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item className="btn">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="primary-button"
              >
                {state && state.data ? "SALVAR" : "CADASTRAR"}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <span>Carregando...</span>
        )}
      </DataComponent>
    </div>
  );
};

export default Data;
