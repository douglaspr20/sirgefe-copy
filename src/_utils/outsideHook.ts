'use client';
import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  RefObject,
} from 'react';

function useClickOutside(initialState: boolean = false): {
  ref: RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: (value: boolean) => void;
} {
  const [open, setOpen] = useState(initialState);
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { ref, open, setOpen };
}

export default useClickOutside;
