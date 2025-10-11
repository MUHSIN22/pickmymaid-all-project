/**
 * The function `validateJWT` checks if a JSON Web Token (JWT) is valid by decoding it and comparing
 * the expiration time with the current time.
 * @param {string} token - The `token` parameter is a string that represents a JSON Web Token (JWT).
 * @returns a boolean value. It returns true if the token is valid and has not expired, and false
 * otherwise.
 */
export const validateJWT = (token: string) => {
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    if (Date.now() >= expirationTime) {
      return false;
    } else {
      return true
    }
  }
  return false; 
};