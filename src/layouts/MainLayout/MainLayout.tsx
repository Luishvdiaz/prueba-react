import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './styles.scss';

export const MainLayout = () => {
  const navigate = useNavigate();

  const { signedUp } = useContext(AppContext);

  return (
    <div className='main-layout'>
      <nav className="main-layout__menu">
        <ul>
          <li onClick={() => navigate(signedUp ? '/employees' : '/signin')}>Empleados</li>
          <li onClick={() => navigate(signedUp ? '/employee-form' : '/signin')}>Agregar Empleado</li>
          <li onClick={() => navigate(signedUp ? '/images' : '/signin')}>Imágenes</li>
          <li onClick={() => navigate('/signin')}>Cerrar Sesión</li>
        </ul>
      </nav>
      <div className='main-layout__outlet'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
