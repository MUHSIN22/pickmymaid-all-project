export const isSuperAdmin = async (token: string) => {
  if (!token) {
    return false;
  } else {
    const decodedToken = await JSON.parse(atob(token.split('.')[1]));
    console.log(decodedToken);

    if (decodedToken?.role === 'SA') {
      return true
    } else {
      return false;
    }
  }
}