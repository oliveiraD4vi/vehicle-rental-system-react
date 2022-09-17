import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/utils";
import { Form, Input, Button, DatePicker } from "antd";

import notification from "../../services/notification";
import api from "../../services/api";

import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const onSubmit = async (data) => {
    const { name, cpf, bornAt, email, password } = data;

    setLoading(true);
    setDisabled(true);

    try {
      await api.post("/user/register", {
        name,
        email,
        password,
        bornAt,
        cpf,
      });

      navigate("/login");
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      const { data } = error.response;

      notification("error", data.message);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated()) navigate("/");
  }, [navigate]);

  return (
    <div className="register-container">
      <Form form={form} className="register-form" onFinish={onSubmit}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Digite seu nome completo",
            },
            {
              min: 10,
              message: "Nome muito curto",
            },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
              message: "Apenas palavras!",
            },
          ]}
        >
          <Input disabled={disabled} placeholder="Nome" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu email",
            },
          ]}
        >
          <Input disabled={disabled} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="cpf"
          rules={[
            {
              required: true,
              message: "Digite seu CPF",
            },
            {
              min: 6,
              message: "Esse não é um CPF válido",
            },
            {
              pattern: /^[\d]+$/,
              message: "Apenas números!",
            },
          ]}
        >
          <Input disabled={disabled} placeholder="CPF" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, insira sua senha ",
            },
            {
              min: 8,
              message: "Essa não é uma senha válida",
            },
          ]}
        >
          <Input.Password disabled={disabled} placeholder="Senha" />
        </Form.Item>

        <Form.Item
          name="bornAt"
          rules={[
            {
              required: true,
              message: "Insira sua data de aniversário",
            },
          ]}
        >
          <DatePicker disabled={disabled} format={dateFormat} />
        </Form.Item>

        <Form.Item className="btn">
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="primary-button"
          >
            CADASTRAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
