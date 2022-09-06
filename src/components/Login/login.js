import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/utils';

import api from '../../services/api';

import "./login.css";

const Login = () => {
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
      login
    </div>
  );
};

export default Login;
