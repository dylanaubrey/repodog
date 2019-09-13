import { JsonValue } from "type-fest";

export type Func = (...args: any[]) => Val;

export type Val = JsonValue | Func | undefined;

export interface ObjectMap {
  [key: string]: Val;
}

export interface StringObjectMap {
  [key: string]: string;
}
