export const BASE_API_URL = 'https://localhost:6969/api';

export const isDev = process.env.NODE_ENV === 'development';

export const entryMocked = isDev;
export const userMocked = isDev;
