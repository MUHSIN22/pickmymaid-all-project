export const validateJWTExpiration = (token:string) => {
    if(token === 'undefined'){
      return false
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    if (Date.now() >= expirationTime) {
      // Handle token expiration logic if needed
      return false;
    } else {
      return true;
    }
}