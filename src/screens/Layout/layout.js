import { useEffect } from "react";
import { auth, rolesPath } from "../../services/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ReservationProvider } from "../../context/ReservationContext";

import api from "../../services/api";
import notification from "../../services/notification";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

import "./layout.css";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getPathUser = (role) => {
    const array = [];
    rolesPath.forEach((elem) => {
      if (elem.role.includes(role)) {
        array.push(elem.path);
      }
    });

    return array;
  };

  useEffect(() => {
    async function checkUser() {
      if (auth.getRole()) {
        let allowedRoutes = getPathUser(auth.getRole());

        if (auth.isAuthenticated() && allowedRoutes.includes(pathname)) {
          try {
            await api.get("/user/check");
          } catch (error) {
            notification("error", "Sessão expirada");

            auth.logout();
            navigate(allowedRoutes[0] || "/login");
          }
        } else if (allowedRoutes.length > 0) {
          navigate(allowedRoutes[0]);
        } else if (allowedRoutes.length === 0) {
          auth
            .logout()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {
              navigate("/login");
            });
        } else {
          navigate(allowedRoutes[0] || "/");
        }
      } else {
        let privateRoutes = getPathUser("ADMIN");

        if (privateRoutes.includes(pathname)) {
          navigate("/login");
        }
      }
    }

    checkUser();
  }, [children]);

  return (
    <ReservationProvider>
      <div
        className={`layout-container ${
          pathname.includes("admin") && !pathname.includes("home")
            ? "admin"
            : "user"
        }`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </ReservationProvider>
  );
};

export default Layout;
