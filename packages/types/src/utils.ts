import { JsonValue } from "type-fest";

export type Func = (...args: any[]) => Value;

export type Value = JsonValue | Func | undefined;

export interface ObjectMap {
  [key: string]: Value;
}

export interface StringObjectMap {
  [key: string]: string;
}
