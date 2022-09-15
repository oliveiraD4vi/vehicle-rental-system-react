import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/grancars-secondary.svg";

import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-container">
      <Button className="link-button" onClick={() => navigate("/")}>
        <img src={logo} alt="brand logo" />
      </Button>
    </div>
  );
};

export default Footer;
