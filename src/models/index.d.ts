import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReservationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Reservation {
  readonly id: string;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly party?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Reservation, ReservationMetaData>);
  static copyOf(source: Reservation, mutator: (draft: MutableModel<Reservation, ReservationMetaData>) => MutableModel<Reservation, ReservationMetaData> | void): Reservation;
}