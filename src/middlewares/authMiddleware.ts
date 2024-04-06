// src/middlewares/authMiddleware.ts

export const useCheckAuth = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  
  return !!jwtToken; // Return true jika token ada, false jika tidak
};
