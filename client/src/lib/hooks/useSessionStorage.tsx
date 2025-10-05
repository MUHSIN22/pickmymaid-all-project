export const useSessionStorage = () => {
  const clearSessionData = (name: string) => {
    sessionStorage.removeItem(name);
  };
  const getSessionData = (name: string) => {
    const data = sessionStorage.getItem(name);
    if (data) return JSON.parse(data);
    else return false;
  };
  const addSessionData = (name: string, data: any) => {
    sessionStorage.setItem(name, JSON.stringify(data));
  };

  return {getSessionData,addSessionData,clearSessionData}
};
