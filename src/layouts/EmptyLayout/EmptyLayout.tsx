import { Outlet } from 'react-router-dom';

export const EmptyLayout = () => {
  return (
    <div className='empty-layout'>
      <Outlet />
    </div>
  );
};

export default EmptyLayout;
