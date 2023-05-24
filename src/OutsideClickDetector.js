import { useEffect, useRef } from 'react';

const OutsideClickDetector = ({ onOutsideClick }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef} />;
};

export default OutsideClickDetector;