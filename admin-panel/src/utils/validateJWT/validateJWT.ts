// Function for validating the token in frontend
// If token is valid then the token will get set to the headers['Authorization']
export const validateAuthToken = (config:any) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined') {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    if (Date.now() >= expirationTime) {
      // Handle token expiration logic if needed
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config; // Return the updated config wrapped in a resolved Promise
};