// src/middlewares/authMiddleware.ts
import { jwtDecode } from 'jwt-decode';

export const useCheckAuth = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  
  return !!jwtToken; // Return true jika token ada, false jika tidak
};

export const decodeJWT = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  
  if (jwtToken) {
    const decoded = jwtDecode(jwtToken);
    // console.log("Decoded JWT Token:", decoded);
    return decoded;
  } else {
    // console.log("No JWT Token found.");
    return null;
  }
};
