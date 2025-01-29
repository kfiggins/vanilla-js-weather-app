export const getCurrentLocation = async () => {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch(() => null);
};
