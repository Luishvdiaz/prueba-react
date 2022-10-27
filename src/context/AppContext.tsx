import React, {
  createContext,
  useState,
  ReactElement,
  useEffect
} from 'react';

import {
  DataContext
} from '../interfaces';
import storage from '../storage';

export const AppContext = createContext<DataContext>({
  signedUp: false,
  setSignedUp: () => { }
});

interface Props {
  children: ReactElement
}

export const AppProvider: React.FC<Props> = (props) => {
  const [signedUp, setSignedUp] = useState<boolean>(false);

  useEffect(() => {
    const apiTypeAux: boolean = storage.get('sessionToken') ? true : false;

    if (apiTypeAux) {
      setSignedUp(apiTypeAux);
    }
  }, []);

  return (
    <AppContext.Provider value={
      {
        signedUp,
        setSignedUp
      }
    }>
      {props.children}
    </AppContext.Provider>
  );
};
