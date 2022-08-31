import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/utils';

import LoadingButton from '@mui/lab/LoadingButton';
import api from '../../services/api';

import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const onSubmit = async (data) => {
    const { name, cpf, bornAt, email, password } = data;

    setLoading(true);
    setDisabled(true);

    try {
      await api.post('/register', {
        name,
        email,
        password,
        bornAt,
        cpf
      });
      
      navigate('/login');
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
    <div className="register-container">
      <form className="register-form">
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Nome"
              required
              disabled={disabled}
              variant="standard"
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="cpf"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="CPF"
              required
              disabled={disabled}
              variant="standard"
              onChange={onChange}
              value={value}
            />
          )}
        />

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

        <Controller
          name="bornAt"
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Data de nascimento"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )}
        />  

        <LoadingButton
          loading={loading}
          variant="contained"
          loadingPosition={'start'}
          className="primary-button"
          onClick={handleSubmit(onSubmit)}
        >
          CADASTRAR
        </LoadingButton>
      </form>
    </div>
  );
};

export default Register;
