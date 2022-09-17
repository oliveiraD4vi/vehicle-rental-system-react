import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/utils";
import { Form, Input, Button } from "antd";

import api from "../../services/api";
import notification from "../../services/notification";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data;

      setLoading(true);
      setDisabled(true);

      try {
        const response = await api.post("/user/login", {
          email,
          password,
        });

        const { data } = response;
        auth.login(data.authData);

        navigate("/");
      } catch (error) {
        setLoading(false);
        setDisabled(false);

        const { data } = error.response;

        notification("error", data.message);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (auth.isAuthenticated()) navigate("/");
  }, [navigate]);

  return (
    <div className="login-container">
      <Form form={form} className="login-form" onFinish={onSubmit}>
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

        <Form.Item className="btn">
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="primary-button"
          >
            ENTRAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
