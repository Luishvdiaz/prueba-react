
import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AppContext } from './context/AppContext';


import { EmptyLayout, MainLayout } from './layouts';
import {
  EmployeeForm,
  Employees,
  Error404,
  Images,
  SignIn
} from './views';

export const App = () => {

  const { signedUp } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmptyLayout />}>
          <Route index element={<Navigate to='/signin' replace={true} />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='*' element={<Error404 />} />
        </Route>
        {
          signedUp && (
            <Route path='/' element={<MainLayout />}>
              <Route path='employees' element={<Employees />} />
              <Route path='employee-form' element={<EmployeeForm />} />
              <Route path='images' element={<Images />} />
            </Route>
          )
        }
      </Routes>
    </BrowserRouter >
  );
};

export default App;

