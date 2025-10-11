export const getFilterdDataByCountry = (country: any, data: any) => {
  return data.filter((item: any) => item.nationality === country);
};

export const getFilterdDatabyLocationAndService = (location: any, service: any, data: any) => {
  console.log('called,.....', data, service, location);
  return data.filter((item: any) => {
    if (location == 0 || !location) {
      return item.service?.toLowerCase() === service?.toLowerCase();
    } else if (service == 0 || !service) {
      return item.location?.toLowerCase() === location?.toLowerCase();
    } else {
      return (
        item.location?.toLowerCase() === location.toLowerCase() &&
        item.service?.toLowerCase() === service?.toLowerCase()
      );
    }
  });
};
