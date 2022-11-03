import { Button, Form, Input, Switch } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import image1 from "../../../../../assets/car-example-green.png";
import image2 from "../../../../../assets/car-example-grey.png";
import image3 from "../../../../../assets/car-example-white.png";

import DataComponent from "../../../../../components/Admin/Data/data";
import api from "../../../../../services/api";
import notification from "../../../../../services/notification";

const Data = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [vehicleData, setVehicleData] = useState();
  const [insert, setInsert] = useState(false);

  const [form] = Form.useForm();
  const images = [image1, image2, image3];

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      setVehicleData(state.data);
    } else {
      setInsert(true);
    }
  }, [state]);

  const onSubmit = async (data) => {
    setLoading(true);
    setDisabled(true);

    try {
      if (state && state.data) {
        await api.put("/vehicle", { ...data, id: state.data.id });
      } else {
        await api.post("/vehicle/register", data);
      }

      setLoading(false);
      setDisabled(false);

      notification("success", "Operação realizada com sucesso!");
      navigate("/admin/vehicles");
    } catch ({ response }) {
      setLoading(false);
      setDisabled(false);

      notification("error", response.data.message);
    }
  };

  const onChange = (checked) => {
    if (checked) {
      setInsert(true);
      setVehicleData(null);
    } else {
      setInsert(false);
      setVehicleData(state.data);
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
        {vehicleData ? (
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
        ) : insert ? (
          <Form form={form} className="form-container" onFinish={onSubmit}>
            <div className="form-group-2">
              <Form.Item
                name="brand"
                label={
                  <>
                    <span className="label-name"> Marca </span>
                  </>
                }
                initialValue={state && state.data ? state.data.brand : null}
                rules={[
                  {
                    required: true,
                    message: "Digite o nome da marca",
                  },
                  {
                    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                    message: "Apenas palavras!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Marca" />
              </Form.Item>

              <Form.Item
                name="model"
                label={
                  <>
                    <span className="label-name"> Modelo </span>
                  </>
                }
                initialValue={state && state.data ? state.data.model : null}
                rules={[
                  {
                    required: true,
                    message: "Digite o modelo do carro",
                  },
                  {
                    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                    message: "Apenas palavras!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Modelo" />
              </Form.Item>
            </div>

            <div className="form-group-3">
              <Form.Item
                name="color"
                label={
                  <>
                    <span className="label-name"> Cor </span>
                  </>
                }
                initialValue={state && state.data ? state.data.color : null}
                rules={[
                  {
                    required: true,
                    message: "Digite a cor do carro",
                  },
                  {
                    pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                    message: "Apenas palavras!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Cor" />
              </Form.Item>

              <Form.Item
                name="plate"
                label={
                  <>
                    <span className="label-name"> Placa </span>
                  </>
                }
                initialValue={state && state.data ? state.data.plate : null}
                rules={[
                  {
                    required: true,
                    message: "Digite a placa do carro",
                  },
                  {
                    pattern: /^[\d A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
                    message: "Apenas palavras e números!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Placa" />
              </Form.Item>

              <Form.Item
                name="value"
                label={
                  <>
                    <span className="label-name"> Diária </span>
                  </>
                }
                initialValue={state && state.data ? state.data.value : null}
                rules={[
                  {
                    required: true,
                    message: "Digite a placa do carro",
                  },
                  {
                    pattern: /^[\d]+$/,
                    message: "Apenas números!",
                  },
                ]}
              >
                <Input disabled={disabled} placeholder="Diária (R$)" />
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
