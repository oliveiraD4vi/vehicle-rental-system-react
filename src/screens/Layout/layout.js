import { useEffect } from "react";
import { auth } from "../../services/utils";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import notification from "../../services/notification";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

import "./layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (auth.isAuthenticated()) {
        try {
          await api.get("/user/check");
        } catch (error) {
          notification("error", "Login expirado");
          auth.logout();
          navigate("/");
        }
      }
    }

    checkUser();
  }, []);

  return (
    <div className="layout-container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
