import { decode, encode } from 'base-64';

//TODO PUT IN .ENV.DEV AND ENV.PROD
export const jwtConstants = {
  secret: encode('MY-SUPER-SECRET-KEY-WITH-MORE-THAN-32-CHARACTERS'),
};
