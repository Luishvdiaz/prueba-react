import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

import { Credentials } from '../../interfaces';

import Storage from '../../storage';

import './styles.scss';

const Error404: React.FC = () => {
  const navigate = useNavigate();

  const { setSignedUp } = useContext(AppContext);

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [credentials, setCredentials] = useState<Credentials>({
    user: '',
    password: ''
  });

  const handleSignIn = () => {
    if (credentials.user === 'admin' && credentials.password === '1234567890') {
      Storage.set('sessionToken', Math.random().toString(36).slice(2));
      setSignedUp(true);
      navigate('/employees');
    } else {
      setAlertMessage('Usuario o contraseña incorrectos');
    }
  }

  useEffect(() => {
    Storage.clear();

    const input1 = document.getElementById('input-user');
    const input2 = document.getElementById('input-password');

    if (input1 && input2) {
      input1.onpaste = function(e) {
        e.preventDefault();
      }
      
      input1.oncopy = function(e) {
        e.preventDefault();
      }
      input2.onpaste = function(e) {
        e.preventDefault();
      }
      
      input2.oncopy = function(e) {
        e.preventDefault();
      }
    }
  }, []);

  return (
    <div className='signin'>
      <div className='signin__form'>
        <h1>Iniciar sesión</h1>
        <input
          className='signin__form__input'
          type="text"
          id='input-user'
          value={credentials.user}
          placeholder='Usuario'
          onChange={(event) => {
            setCredentials({
              ...credentials,
              user: event.target.value
            })
          }}
        />
        <input
          className='signin__form__input'
          type="password"
          id='input-password'
          value={credentials.password}
          placeholder='Contraseña'
          onChange={(event) => {
            setCredentials({
              ...credentials,
              password: event.target.value
            })
          }}
        />
        <p className='signin__form__alert'>{alertMessage}</p>
        <button
          className='signin__form__button'
          onClick={handleSignIn}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Error404;
