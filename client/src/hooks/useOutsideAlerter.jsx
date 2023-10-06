import { useState, useEffect, useRef } from 'react';

export default function useOutsideAlerter(isVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(isVisible);
    
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}