// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Reservation } = initSchema(schema);

export {
  User,
  Reservation
};