import { useNavigate } from 'react-router-dom';

import logo from "../../assets/grancars-primary.svg";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <img src={logo} alt="brand logo" onClick={() => navigate('/')} />
    </div>
  );
};

export default Header;
