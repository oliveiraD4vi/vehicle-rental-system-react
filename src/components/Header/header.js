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
      <Button
        className="link-button"
        style={{ padding: "0" }}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="brand logo" />
      </Button>

      {!auth.isAuthenticated() || auth.getRole() === "CLIENT" ? (
        <ul className="navigation-container">
          <li className="navigation-item">
            <Button
              onClick={() => navigate("/")}
              className={`navigation-btn ${
                location.pathname === "/" ? "checked" : "unchecked"
              }`}
            >
              HOME
            </Button>
          </li>
          <li className="navigation-item">
            <Button
              onClick={() => navigate("/cars")}
              className={`navigation-btn ${
                location.pathname === "/cars" ? "checked" : "unchecked"
              }`}
            >
              CARROS
            </Button>
          </li>
          {auth.isAuthenticated() && (
            <li className="navigation-item">
              <Button
                disabled={auth.isAuthenticated() ? false : true}
                onClick={() => navigate("/reservations")}
                className={`navigation-btn ${
                  location.pathname === "/reservations"
                    ? "checked"
                    : "unchecked"
                }`}
              >
                RESERVAS
              </Button>
            </li>
          )}
          <li className="navigation-item">
            <Button
              onClick={() => navigate("/about")}
              className={`navigation-btn ${
                location.pathname === "/about" ? "checked" : "unchecked"
              }`}
            >
              SOBRE NÓS
            </Button>
          </li>
        </ul>
      ) : null}

      <div className="action-container">
        {auth.isAuthenticated() ? (
          <Button
            type="primary"
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
            type="primary"
            onClick={() => navigate("/register")}
            className="primary-button"
          >
            CADASTRAR
          </Button>
        ) : location.pathname === "/register" ? (
          <Button
            type="primary"
            onClick={() => navigate("/login")}
            className="primary-button"
          >
            ENTRAR
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate("/register")}
              className="link-button"
            >
              Cadastrar
            </Button>

            <Button
              type="primary"
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
