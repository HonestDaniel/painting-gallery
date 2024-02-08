import { RefObject, TouchEvent, useCallback, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler();
    }
  }, [ref, handler]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOutsideClick;
