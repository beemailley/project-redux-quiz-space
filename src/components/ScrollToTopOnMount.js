// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

export const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}