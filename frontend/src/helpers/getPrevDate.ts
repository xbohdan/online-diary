const getPrevDate = (currentDate: Date): Date => {
  return new Date(currentDate.getTime() - 86400000);
};

export default getPrevDate;
