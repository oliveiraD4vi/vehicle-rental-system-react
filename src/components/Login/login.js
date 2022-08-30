import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';

import { auth } from '../../services/utils';
import api from '../../services/api';

import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const onSubmit = async (data) => {
    const { email, password } = data;

    setLoading(true);
    setDisabled(true);

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const { data } = response;
      auth.login(data.authData);
      
      navigate('/');
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      alert('deu errado');
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated()) navigate('/');
  }, [navigate]);

  return (
    <div className="login-container">
      <form className="login-form">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Email"
              required
              disabled={disabled}
              variant="standard"
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Senha"
              required
              disabled={disabled}
              variant="standard"
              onChange={onChange}
              value={value}
            />
          )}
        />

        {loading ? (
          <LoadingButton
            variant="contained"
            className="primary-button"
          >
            ENTRAR
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            className="primary-button"
            onClick={handleSubmit(onSubmit)}
          >
            ENTRAR
          </Button>
        )}
      </form>
    </div>
  );
};

export default Login;
