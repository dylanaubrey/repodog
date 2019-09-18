export type Falsy = null | undefined | false | 0 | "";

export type Func = (...args: any[]) => any; // tslint:disable-line no-any

export interface ObjectMap {
  [key: string]: any; // tslint:disable-line no-any
}

export type Primitive = number | bigint | boolean | string | symbol;

export interface StringObjectMap {
  [key: string]: string;
}
