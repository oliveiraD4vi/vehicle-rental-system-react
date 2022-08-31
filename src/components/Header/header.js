import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from '@mui/material';
import logo from "../../assets/grancars-primary.svg";

import { auth } from '../../services/utils';
import { useNavigate, useLocation } from 'react-router-dom';

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="header-container">
      <img src={logo} alt="brand logo" onClick={() => navigate('/')} />

      <FormControl>
        <RadioGroup
          row
          name="navigation"
          aria-labelledby="navigation"
          onChange={(e, value) => navigate(value)}
        >
          <FormControlLabel
            value="/"
            label="HOME"
            className={
              `nav-button ${location.pathname === '/'
                ? 'checked'
                : 'unchecked'
              }`
            }
            sx={{ margin: '0', padding: '5px 20px' }}
            control={<Radio sx={{ display: 'none' }} />}
          />
          <FormControlLabel
            value="/cars"
            label="CARROS"
            className={
              `nav-button ${location.pathname === '/cars'
                ? 'checked'
                : 'unchecked'
              }`
            }
            sx={{ margin: '0', padding: '5px 20px' }}
            control={<Radio sx={{ display: 'none' }} />}
          />
          <FormControlLabel
            value="/reservation"
            label="RESERVAS"
            className={
              `nav-button ${location.pathname === '/reservation'
                ? 'checked'
                : 'unchecked'
              }`
            }
            sx={{ margin: '0', padding: '5px 20px' }}
            control={
              <Radio
                disabled={auth.isAuthenticated() ? false : true}
                sx={{ display: 'none' }}
              />
            }
          />
          <FormControlLabel
            value="/about"
            label="SOBRE NÓS"
            className={
              `nav-button ${location.pathname === '/about'
                ? 'checked'
                : 'unchecked'
              }`
            }
            sx={{ margin: '0', padding: '5px 20px' }}
            control={<Radio sx={{ display: 'none' }} />}
          />
        </RadioGroup>
      </FormControl>

      <div className="action-container">
        {auth.isAuthenticated() ? (
          <Button
            onClick={() => {
              auth.logout();
              navigate('/login');
            }}
            className="primary-button"
            variant="container"
          >
            SAIR
          </Button>
        ) : location.pathname === '/login' ? (
          <Button
            onClick={() => navigate('/register')}
            className="primary-button"
            variant="container"
          >
            CADASTRAR
          </Button>
        ) : location.pathname === '/register' ? (
          <Button
            onClick={() => navigate('/login')}
            className="primary-button"
            variant="container"
          >
            ENTRAR
          </Button>
        ) : (
          <>
            <span
              style={{ cursor: 'pointer', margin: '0 15px 0 0' }}
              onClick={() => navigate('/register')}
            >
              Cadastrar
            </span>

            <Button
              onClick={() => navigate('/login')}
              className="primary-button"
              variant="container"
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
