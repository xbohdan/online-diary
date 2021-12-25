// Convert Date object to string 'yyyy-mm-dd'
const dateToString = (date: Date): string => {
  return `${date.getFullYear().toString()}-${(
    date.getMonth() + 1
  ).toString()}-${date.getDate().toString()}`;
};

export default dateToString;
