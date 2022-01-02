const isValidToken = (expiration: string): boolean => {
  const expirationDate = new Date(expiration).getTime();
  const currentDate = Date.now();
  return currentDate < expirationDate;
};

export default isValidToken;
