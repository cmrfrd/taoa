import throttle from 'lodash/throttle';
import { useState, useEffect } from 'react';

/**
 *  useHideOnScrolled is a function to hold the state
 *  of where the scroll bar is located on the page.
 *
 *  When the scroll bar is close to '0' the state is set to true
 */
const useStickyOnScrolled = (): boolean => {
  const [sticky, setSticky] = useState<boolean>(false);

  const handleScroll = (): void => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setSticky(top > 1);
  };

  useEffect((): (() => void) => {
    window.addEventListener('scroll', throttle(handleScroll, 20));
    return (): void => {
      window.removeEventListener('scroll', throttle(handleScroll, 20));
    };
  }, []);

  return sticky;
};

export default useStickyOnScrolled;
