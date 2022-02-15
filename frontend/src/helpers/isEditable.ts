export const dayDurationMs = 24 * 60 * 60 * 1000;
export const today = new Date().setUTCHours(0, 0, 0, 0);

const isYesterdayOrTomorrow = (initialDate: Date): boolean => {
  return Math.abs(initialDate.getTime() - today) === dayDurationMs;
};

const isToday = (initialDate: Date): boolean => {
  return initialDate.getTime() === today;
};

const isEditable = (initialDate: Date): boolean => {
  return isYesterdayOrTomorrow(initialDate) || isToday(initialDate);
};

export default isEditable;
