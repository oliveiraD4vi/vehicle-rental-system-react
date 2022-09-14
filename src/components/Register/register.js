import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/utils";

import api from "../../services/api";

import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data) => {
    const { name, cpf, bornAt, email, password } = data;

    setLoading(true);
    setDisabled(true);

    try {
      await api.post("/register", {
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
      alert("deu errado");
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated()) navigate("/");
  }, [navigate]);

  return <div className="register-container">register</div>;
};

export default Register;
