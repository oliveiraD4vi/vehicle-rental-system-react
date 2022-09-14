import { useNavigate } from "react-router-dom";

import logo from "../../assets/grancars-secondary.svg";

import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-container">
      <img src={logo} alt="brand logo" onClick={() => navigate("/")} />
    </div>
  );
};

export default Footer;
