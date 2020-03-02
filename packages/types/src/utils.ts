export type Falsy = null | undefined | false | 0 | "";

export type Func = (...args: any[]) => any; // tslint:disable-line no-any

export interface PlainObject {
  [key: string]: any; // tslint:disable-line no-any
}

export type Primitive = number | bigint | boolean | string | symbol;

export interface StringObject {
  [key: string]: string;
}
