import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const EmployeeForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    birthday: ''
  });
  const [formDataAlert, setFormDataAlert] = useState({
    name: '',
    last_name: '',
    birthday: ''
  });
  const [error, setError] = useState<string>('')

  const validData = (): boolean => {
    if (formData.name.length === 0) {
      setFormDataAlert({
        ...formDataAlert,
        name: 'Campo requerido'
      });
      return false;
    }

    if (formData.last_name.length === 0) {
      setFormDataAlert({
        ...formDataAlert,
        name: '',
        last_name: 'Campo requerido'
      });
      return false;
    }

    if (formData.birthday.length === 0) {
      setFormDataAlert({
        name: '',
        last_name: '',
        birthday: 'Campo requerido'
      });
      return false;
    }

    return true;
  };

  const onSaveEmployee = async () => {
    if (validData()) {
      await fetch('https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/luis_diaz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          last_name: formData.last_name,
          birthday: formData.birthday.split('-').join('/')
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            name: '',
            last_name: '',
            birthday: ''
          });
          setFormDataAlert({
            name: '',
            last_name: '',
            birthday: ''
          });
          navigate('/employees');
        })
        .catch((error) => {
          setError(error);
        });
    }
  }

  return (
    <div className='employee-form'>
      <div className='employee-form__form'>
        <p className='employee-form__form__title'>Añadir empleado</p>
        <p className='employee-form__form__error'>{error}</p>
        <input
          className={`employee-form__form__input employee-form__form__input${formDataAlert.name ? '--alert' : ''}`}
          type="text"
          id='input-user'
          value={formData.name}
          placeholder='Nombre'
          onChange={(event) => {
            if (event.target.value.length < 30) {
              setFormData({
                ...formData,
                name: event.target.value
              })
            }
          }}
        />
        <p className='employee-form__form__error'>{formDataAlert.name}</p>
        <input
          className={`employee-form__form__input employee-form__form__input${formDataAlert.last_name ? '--alert' : ''}`}
          type="text"
          id='input-user'
          value={formData.last_name}
          placeholder='Apellido'
          onChange={(event) => {
            if (event.target.value.length < 30) {
              setFormData({
                ...formData,
                last_name: event.target.value
              })
            }
          }}
        />
        <p className='employee-form__form__error'>{formDataAlert.last_name}</p>
        <input
          className={`employee-form__form__input employee-form__form__input${formDataAlert.birthday ? '--alert' : ''}`}
          type="date"
          id='input-user'
          value={formData.birthday}
          placeholder='Fecha de nacimiento'
          onChange={(event) => {
            setFormData({
              ...formData,
              birthday: event.target.value
            })
          }}
        />
        <p className='employee-form__form__error'>{formDataAlert.birthday}</p>
        <button className='employee-form__form__button' onClick={onSaveEmployee}>Guardar</button>
      </div>
    </div>
  );
};

export default EmployeeForm;
