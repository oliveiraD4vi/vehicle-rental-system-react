import { useNavigate } from "react-router-dom";
import { Form, Button, DatePicker } from "antd";
import moment from "moment";

import "./dateSelector.css";

const DateSelector = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const onSubmit = async (data) => {
    const { pickAt, returnAt } = await data;

    // não está passando
    navigate("/cars", {
      state: {
        data: {
          pickAt: moment(pickAt),
          returnAt: moment(returnAt),
        },
      },
    });
  };

  return (
    <div className="selector-container">
      <h2>Selecione as datas de retirada e devolução</h2>

      <Form form={form} className="reservation-date-form" onFinish={onSubmit}>
        <div className="form-date">
          <Form.Item
            name="pickAt"
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
            name="returnAt"
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
          <Button type="primary" htmlType="submit" className="secondary-button">
            CONTINUAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DateSelector;
