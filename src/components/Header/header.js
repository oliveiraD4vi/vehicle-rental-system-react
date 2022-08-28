import {
  Box,
  Button,
  BottomNavigation,
  BottomNavigationAction,
}
from '@mui/material';
import logo from "../../assets/grancars-primary.svg";

import { useNavigate } from 'react-router-dom';

import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <img src={logo} alt="brand logo" onClick={() => navigate('/')} />

      <Box className="box-container">
        <BottomNavigation
          showLabels
          onChange={(e, newValue) => {
            navigate(newValue);
          }}
        >
          <BottomNavigationAction className="navigation-btn" value="/home" label="HOME" />
          <BottomNavigationAction className="navigation-btn" value="/cars" label="CARROS" />
          <BottomNavigationAction className="navigation-btn" value="/reservation/form" label="RESERVAS" />
          <BottomNavigationAction className="navigation-btn" value="/about" label="SOBRE NÓS" />
        </BottomNavigation>
      </Box>

      <Button className="primary-button" variant="container">LOGIN</Button>
    </div>
  );
};

export default Header;
