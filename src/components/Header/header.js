import logo from "../../assets/grancars-primary.svg";

import { Button } from "antd";
import { auth } from "../../services/utils";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="header-container">
      <img src={logo} alt="brand logo" onClick={() => navigate("/")} />

      <ul>
        <li onClick={() => navigate("/")}>HOME</li>
        <li onClick={() => navigate("/cars")}>CARROS</li>
        <li onClick={() => navigate("/reservations")}>RESERVAS</li>
        <li onClick={() => navigate("/about")}>SOBRE NÓS</li>
      </ul>

      <div className="action-container">
        {auth.isAuthenticated() ? (
          <Button
            onClick={() => {
              auth.logout();
              navigate("/login");
            }}
            className="primary-button"
          >
            SAIR
          </Button>
        ) : location.pathname === "/login" ? (
          <Button
            onClick={() => navigate("/register")}
            className="primary-button"
          >
            CADASTRAR
          </Button>
        ) : location.pathname === "/register" ? (
          <Button onClick={() => navigate("/login")} className="primary-button">
            ENTRAR
          </Button>
        ) : (
          <>
            <span
              style={{ cursor: "pointer", margin: "0 15px 0 0" }}
              onClick={() => navigate("/register")}
            >
              Cadastrar
            </span>

            <Button
              onClick={() => navigate("/login")}
              className="primary-button"
            >
              ENTRAR
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
