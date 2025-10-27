import { Nullable, TypeOf } from "@ts/types";
import { circularReferenceHandler } from "@tsn-object/generic/implementations";


export function json(obj: any): string {
  return JSON.stringify(obj, circularReferenceHandler());
}

export function isNull<T>(value: Nullable<T>, ...customNullValues: any[]): value is Nullable<null> {
  const negatedValues = [0, '', false] as typeof value[];
  const jsonNullValues: string[] = customNullValues.map((v: any): string=> json(v));
  return (
    jsonNullValues.includes(json(value)) ?
      true :
      !negatedValues.includes(value) && !value
  );
}

export function isNullOrUndefined<T>(value: Nullable<T>): value is Nullable<null> {
  return value == null || value == undefined;
}

export function equals<T,R>(a: T, b: R, ...customNullValues: any[]): a is T&R {
  let result: boolean = isNull(a, ...customNullValues) && isNull(b, ...customNullValues);
  if (!result) {
    result = json(a) == json(b);
  }
  return result;
}