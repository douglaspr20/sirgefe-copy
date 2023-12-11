'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type BackdropLoaderContextType = {
  displayBackDropLoader: boolean;
  setDisplayBackDropLoader: Dispatch<SetStateAction<boolean>>;
};

const BackdropLoaderContext = createContext({} as BackdropLoaderContextType);

export const useBackdropLoaderContext = () => useContext(BackdropLoaderContext);

type BackdropLoaderProviderProps = {
  children: ReactNode;
};

export const BackdropLoaderProvider = ({
  children,
}: BackdropLoaderProviderProps) => {
  const [displayBackDropLoader, setDisplayBackDropLoader] = useState(false);

  return (
    <BackdropLoaderContext.Provider
      value={{ displayBackDropLoader, setDisplayBackDropLoader }}
    >
      {/* <Backdrop
        sx={{
          color: '#00A1B2',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={displayBackDropLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

      {children}
    </BackdropLoaderContext.Provider>
  );
};
