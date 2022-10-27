import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='error-404'>
      <h1>No pudimos encontrar lo que buscabas :(</h1>
      <button
        onClick={() => navigate('/employees')}
        className='error-404__button'
      >
        Regresar
      </button>
    </div>
  );
};

export default Error404;
