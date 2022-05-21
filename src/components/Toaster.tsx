import React from 'react';
import { Toaster } from 'react-hot-toast';

export const StyledToaster = () => {
  const isDesktop = window.innerWidth > 1000;
  return (
    <Toaster
      position={isDesktop ? 'top-center' : 'bottom-center'}
      toastOptions={{
        style: {
          background: '#f8d7da',
          color: '#8C2A2F',
        },
      }}
    />
  );
};
