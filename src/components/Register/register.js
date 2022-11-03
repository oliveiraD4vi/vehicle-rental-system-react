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
      const { data } = await api.post("/user/register", {
        name,
        email,
        password,
        bornAt,
        cpf,
      });

      notification("success", data.message);
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
          label={
            <>
              <span className="label-name"> Nome </span>
            </>
          }
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
          label={
            <>
              <span className="label-name"> Email </span>
            </>
          }
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
          label={
            <>
              <span className="label-name"> CPF </span>
            </>
          }
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
          label={
            <>
              <span className="label-name"> Senha </span>
            </>
          }
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
          label={
            <>
              <span className="label-name"> Data de Nascimento </span>
            </>
          }
          rules={[
            {
              required: true,
              message: "Insira sua data de nascimento",
            },
          ]}
        >
          <DatePicker
            placeholder="Data de nascimento"
            disabled={disabled}
            format={dateFormat}
          />
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
