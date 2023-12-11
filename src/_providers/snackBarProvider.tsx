'use client';
import { SnackBar } from '_components/SnackBar.client';
import { SnackBarState } from '@interfaces/snackbar';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SnackbarContextType = {
  displaySnackBar: SnackBarState;
  setSnackBar: Dispatch<SetStateAction<SnackBarState>>;
};

const SnackbarContext = createContext<SnackbarContextType>(undefined!);

export const useSnackbarContext = () => useContext(SnackbarContext);

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [displaySnackBar, setSnackBar] = useState<SnackBarState>({
    display: false,
    message: 'hello there',
    severity: 'success',
  });

  return (
    <SnackbarContext.Provider value={{ displaySnackBar, setSnackBar }}>
      {children}
      <SnackBar />
    </SnackbarContext.Provider>
  );
};
