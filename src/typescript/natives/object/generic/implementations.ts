import { Function } from "@tsn-function/generic/types";
import { AnyValue, Nullable } from "@tsi/types";
import { ConcatStrIntoKeys, CustomReturn, EntriesReturn, KeysOfType, Object, RemoveCicularReferences } from "./types";
import { KeyOf } from "./types.native";
import { _String } from "@tsn-string/generic/implementations";
import { AnyClass } from "@tsn-class/generic/types";


export function isEmptyObj(obj: Object): obj is {} {
	for (let _x in obj) {
		return false;
	}
	return true;
}

function removeCircularReferences(): RemoveCicularReferences {
  const seen = new Set();
  return function(key: string, value: any): any {
    if (value !== null && typeof value === 'object') {
      if (seen.has(value)) {
        return undefined;
      }
      seen.add(value);
    }
    return value;
  };
}

function isNull<T>(value: Nullable<T>, ...customNullValues: any[]): value is Nullable<null> {
  const negatedValues = [0, '', false] as typeof value[];
  const jsonNullValues: string[] = customNullValues.map((v: any): string=> json(v));
  return (
    jsonNullValues.includes(json(value)) ?
      true :
      !negatedValues.includes(value) && !value
  );
}

function isNullOrUndefined<T>(value: Nullable<T>): value is Nullable<null> {
  return value == null || value == undefined;
}

function equals(a: any, b: any, ...customNullValues: any[]): boolean {
  let result: boolean = isNull(a, ...customNullValues) && isNull(b, ...customNullValues);
  if (!result) {
    result = json(a) == json(b);
  }
  return result;
}

function makeObjectBasedOn<T extends (AnyClass|AnyValue)>(value: T): T {
  const obj = {} as T;
  (Object.getOwnPropertyNames(value) as KeyOf<T>[])
    .forEach((key: KeyOf<T>): void => {
      obj[key] = value[key];
    });
  return obj;
}

function addPrefixToKeys<T extends Object, Prefix extends string>(value: T, prefix: Prefix): ConcatStrIntoKeys<T, Prefix> {
  const obj: any = {};
  (Object.getOwnPropertyNames(value) as KeyOf<T, string>[])
    .forEach((key: KeyOf<T, string>): void => {
      const newKey = `${prefix}${_String.capitalize(key)}`;
      obj[newKey] = value[key];
    });
  return obj as ConcatStrIntoKeys<T, Prefix>;
}

function copyValue<T extends (AnyClass|AnyValue), Prefix extends Nullable<string, true> = null >(
  value:T, 
  prefixOnKeys?: Prefix,
): CustomReturn<Prefix,[
  [string, ConcatStrIntoKeys<T, Prefix>],
  [null|undefined, T]
]> {
  let copiedValue: any;
  try {
    copiedValue = structuredClone(value);
  } catch {
    copiedValue = makeObjectBasedOn(value);
  }
  if (isNull(prefixOnKeys, '')) {
    return copiedValue;
  }
  copiedValue = addPrefixToKeys(copiedValue, prefixOnKeys);
  return copiedValue;
}

function json(obj: any): string {
  return JSON.stringify(obj, removeCircularReferences());
}

function getValueFromPath(obj: any, path: string): any {
  if (!path || !obj) return obj;
  return path.split('.').reduce((acc: any, key: string): any => {
    return acc[key];
  }, obj);
}

function setValueFromPath(obj: any, path: string, value: any): void {
  if (!path || !obj) return;
  const keys: string[] = path.split('.');
  keys.reduce((acc: any, key: string, idx: number): any => {
    if (idx == keys.length - 1) {
      acc[key] = value;
    }
    return acc[key];
  }, obj);
}

function removeNullFields<T extends object>(obj: T): Partial<T> {
  return (Object.entries(obj) as EntriesReturn<T>[])
    .reduce((acc: Partial<T>, [key, value]: EntriesReturn<T>): Partial<T> => {
      if (!isNull(value)) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
}

function λ<T extends Object, R>(value: T, functionName: KeysOfType<T, Function>): R {
  return ((...args: any): any => {
    return (value[functionName] as Function)(...args);
  }) as R;
}

function lambda<T extends Object, R>(value: T, functionName: KeysOfType<T, Function>): R {
  return λ(value, functionName);
}

function isAClassDeclaration<T>(obj: any): obj is AnyClass<T> & T {
  return typeof obj === 'function' && /^class\s/.test(obj.toString());
}

export const _Object = {
  isEmptyObj,
	isNull,
	isNullOrUndefined,
	isAClassDeclaration,
	removeCircularReferences,
	equals,
	makeObjectBasedOn,
	addPrefixToKeys,
	copyValue,
	json,
	getValueFromPath,
	setValueFromPath,
	removeNullFields,
	lambda,
	λ,
};