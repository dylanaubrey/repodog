import { JsonValue } from "type-fest";

export type Falsy = null | undefined | false | 0 | "";

export type Func = (...args: any[]) => Val;

export interface ObjectMap {
  [key: string]: Val;
}

export type Primitive = number | bigint | boolean | string | symbol;

export interface StringObjectMap {
  [key: string]: string;
}

export type Val = JsonValue | bigint | Func | undefined;
