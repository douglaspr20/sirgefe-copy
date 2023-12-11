'use client';
import { SnackBar } from '@components/SnackBar';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type LayoutContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const LayoutContext = createContext({} as LayoutContextType);

export const useLayoutContext = () => useContext(LayoutContext);

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsSidebarOpen(
      Boolean(JSON.parse(localStorage.getItem('openSidebar') as string)),
    );
  }, [localStorage.getItem('openSidebar')]);

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}

      <SnackBar />
    </LayoutContext.Provider>
  );
};
