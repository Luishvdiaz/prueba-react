import React, { useEffect, useState } from 'react';

import { Employee } from '../../interfaces';

import './styles.scss';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesAux, setEmployeesAux] = useState<Employee[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [pageIndex1, setPageIndex1] = useState<number>(0);
  const [pageIndex2, setPageIndex2] = useState<number>(10);

  const getEmployees = async () => {
    await fetch('https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/luis_diaz')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.data.employees);
        setEmployeesAux(data.data.employees);
      });
  }

  const onSearch = () => {
    if (searchName.length > 0) {
      const result: Employee[] = [];

      for (let index = 0; index < employees.length; index += 1) {
        if (employees[index].name.toLowerCase().includes(searchName.toLowerCase())) {
          result.push(employees[index]);
        }
      }

      if (result) {
        setEmployees(result);
      }
    }
  };

  const previusPage = () => {
    if (pageIndex1 - 10 >= 0) {
      setPageIndex2(pageIndex2 - 10);
      setPageIndex1(pageIndex1 - 10);
    }
  };

  const nextPage = () => {
    setPageIndex2(pageIndex2 + 10);
    setPageIndex1(pageIndex1 + 10);
  };

  const formatDate = (date: number): string => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className='employees'>
      <h1 className='employees__title'>Empleados</h1>
      <div className='employees__form'>
        <input
          className='employees__form__input'
          type="text"
          id='input-user'
          value={searchName}
          placeholder='Buscar por Nombre'
          onChange={(event) => {
            setSearchName(event.target.value);
            if (event.target.value === '') {
              setEmployees(employeesAux);
            }
          }}
        />
        <button className='employees__form__button' onClick={onSearch}>Buscar</button>
      </div>
      <p className='employees__items'>{employees.length} elementos</p>
      <table className='employees__table'>
        <thead>
          <tr className='employees__table__header'>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.slice(pageIndex1, pageIndex2).map((item: Employee, index: number) => (
              <tr className='employees__table__row' key={index}>
                <td className='employees__table__row__cell'>{item.id}</td>
                <td className='employees__table__row__cell'>{item.name}</td>
                <td className='employees__table__row__cell'>{item.last_name}</td>
                <td className='employees__table__row__cell'>{formatDate(item.birthday)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='employees__pagination'>
        <button
          onClick={previusPage}
          className='employees__pagination__button'
        >
          Anterior
        </button>
        <p>Página: {String(pageIndex2).substring(0, String(pageIndex2).length - 1)}</p>
        <button
          onClick={nextPage}
          className='employees__pagination__button'
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Employees;
