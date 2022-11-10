import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Form, Button, DatePicker } from "antd";
import { ReservationContext } from "../../context/ReservationContext";

import "./dateSelector.css";

const DateSelector = ({ data }) => {
  const { setReservationData } = useContext(ReservationContext);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dateFormat = "DD/MM/YYYY";

  const onSubmit = async (data) => {
    const { pickup, devolution } = await data;
    setReservationData({ pickup, devolution });
    navigate("/cars");
  };

  return (
    <div className="centered-container">
      <div className="selector-container">
        <h2>
          datas de <span>R</span>etirada e <span>D</span>evolução
        </h2>
        <Form form={form} className="reservation-date-form" onFinish={onSubmit}>
          <div className="form-date">
            <Form.Item
              name="pickup"
              initialValue={data ? data.pickup : null}
              rules={[
                {
                  required: true,
                  message: "Insira a data de retirada do veículo",
                },
              ]}
            >
              <DatePicker placeholder="Data de retirada" format={dateFormat} />
            </Form.Item>

            <Form.Item
              name="devolution"
              initialValue={data ? data.devolution : null}
              rules={[
                {
                  required: true,
                  message: "Insira a data de devolução do veículo",
                },
              ]}
            >
              <DatePicker placeholder="Data de devolução" format={dateFormat} />
            </Form.Item>
          </div>

          <Form.Item className="btn">
            <Button
              type="primary"
              htmlType="submit"
              className="secondary-button"
            >
              CONTINUAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DateSelector;
