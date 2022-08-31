import { useState, useEffect, useCallback } from 'react';
import { TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/utils';

import LoadingButton from '@mui/lab/LoadingButton';
import api from '../../services/api';

import "./login.css";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const onSubmit = useCallback( async (data) => {
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
  }, [navigate]);

  // const keyDownEvent = useCallback((event) => {
  //   if (event.key.toLowerCase() === 'enter') handleSubmit((data) => onSubmit(data));
  // }, [handleSubmit, onSubmit]);

  // useLayoutEffect(() => {
  //   const form = document.getElementById('form');
  //   form.addEventListener('keydown', keyDownEvent);

  //   return () => {
  //     form.removeEventListener('keydown', keyDownEvent);
  //   };
  // });

  useEffect(() => {
    if (auth.isAuthenticated()) navigate('/');
  }, [navigate]);

  return (
    <div className="login-container">
      <form id="form" className="login-form">
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

        <LoadingButton
          loading={loading}
          variant="contained"
          loadingPosition={'start'}
          className="primary-button"
          onClick={handleSubmit(onSubmit)}
        >
          ENTRAR
        </LoadingButton>
      </form>
    </div>
  );
};

export default Login;
