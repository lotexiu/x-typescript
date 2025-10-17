import { Function } from "@tsn-function/generic/types";
import { Pair } from "@tsn-array/generic/types";
import { Extends } from "@tsi/types";
import { KeyOf, Pick } from "./types.native";

type ICommonFields<T, U> = Pick<T, Extract<keyof T, keyof U>>;

type IPrimitiveObject = {
  [key: string|number]: any;
  [key: symbol]: symbol;
} & Object

type _Object = Object & {[key: string|number]: any;} 
  & INegate<[]>;

/**
 * Negates the presence of a key in a mapped type.
 *
 * @template T - The object type to negate keys from.
 *
 * @example
 * type Example = { a: number; b: string };
 * type Negated = INegate<Example>;
 * // Result: { b?: any } | { a?: any }
 */
type INegate<T> = {
  [K in KeyOf<T, string>]: {
    [P in KeyOf<T, string>]?: P extends K ? never : any
  }
}[KeyOf<T, string>];

type IObject<T=_Object> =
  T extends Function ? never :
  T extends Array<any> ? never :
  T extends object ? T & Object :
  never;

/**
 * Restricts the fields that can be created in an object and their types.
 *
 * @template fieldType - The allowed field names (as string literal types).
 * @template valueType - The type of the values for each field (default: any).
 *
 * @example
 * type Fields = "field1" | "field2";
 *
 * // Valid usage:
 * const myObj: LockedParams<Fields, string> = {
 *   field1: "something",
 *   field2: "another thing"
 * };
 *
 * // Invalid usage (will cause TypeScript errors):
 * const myObj2: LockedParams<Fields, string> = {
 *   field1: "something",
 *   field2: 2, // Error: value must be string
 *   field3: "extra" // Error: field3 is not allowed
 * };
 *
 * // Result: Only the specified fields are allowed, and their values must match the specified type.
 */
type ILockedParams<
  fieldType,  
  valueType = any                    
> = Partial<Record<Extends<fieldType, string>, valueType>>

/**
 * Maps a type to a set of return types based on a list of pairs.
 *
 * @template Type - The type to match against the first element of each pair.
 * @template Returns - An array of pairs [key, returnType].
 *
 * @example
 * type CReturn<T> = CustomReturn<T, [
 *   ["X", string],
 *   ["Y" | "K", number]
 * ]>;
 *
 * type Result1 = CReturn<"X" | "Y">; // string | number
 * type Result2 = CReturn<"Y">; // number
 * type Result3 = CReturn<"K">; // number
 * type Result4 = CReturn<"X">; // string
 * type Result5 = CReturn<"Z">; // never
 *
 * // Result: Returns the mapped type for the given key, or never if not found.
 */
type ICustomReturn <
Type, 
Returns extends Pair<any, any>[]
> = {
  [Return in KeyOf<Returns>]: 
    Type extends Returns[Return][0] ?
      Returns[Return][1] :
      never
}[number]

/**
 * Returns the keys that are of a specific type in the target object.
 *
 * @template Target - The object or class type
 * @template Type - The type to match
 *
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 *   isActive: boolean;
 * }
 * type StringKeys = KeysOfType<Example, string>; // "name"
 *
 * @returns A union of keys whose values match the specified type.
 */
type IKeysOfType<
  Target, 
  Type
> = {
  [Key in KeyOf<Target>]: Target[Key] extends Type ? Key : never
}[KeyOf<Target>]

/**
 * Returns the key if it exists in the target and matches the type.
 *
 * @template Target - The object or class type
 * @template Key - The key to check
 * @template Type - The type to match
 *
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 * }
 * type ExactKey = HasExactKey<Example, 'id', number>; // 'id'
 *
 * @returns The key if it matches the type, otherwise never.
 */
type IHasExactKey <
  Target, 
  Key extends KeyOf<Target>,
  Type extends Target[Key]
> = Target[Key] extends Type ? Key : never

/**
 * Concatenates a prefix and capitalizes the first letter of each method key.
 *
 * @template Base - The base object or class
 * @template Prefix - The prefix string
 *
 * @example
 * interface Methods {
 *   getName(): string;
 *   getAge(): number;
 * }
 * type PrefixedMethods = ConcatStrIntoKeys<Methods, 'prefix'>;
 * // {
 * //   prefixGetName(): string;
 * //   prefixGetAge(): number;
 * // }
 */
type IConcatStrIntoKeys<Base, Prefix extends string|null|undefined> = {
  [Key in KeyOf<Base> as 
    Key extends string ? `${Prefix}${Capitalize<Key>}`
    : never
  ]: Base[Key];
};

/**
 * Extracts the type of a specific key from an object or class.
 *
 * @template T - The object or class type
 * @template K - The key to extract
 *
 * @example
 * interface Example {
 *   id: number;
 * }
 * type IdType = GetTypeFromKey<Example, 'id'>; // number
 */
type IGetTypeFromKey<T, K extends KeyOf<T>> = T[K];

/**
 * Returns a tuple of [key, value] for an object or class.
 *
 * @template T - The object or class type
 *
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 * }
 * type Entry = EntriesReturn<Example>; // ["id" | "name", number | string]
 */
type IEntriesReturn<T> = [KeyOf<T>, IGetTypeFromKey<T, KeyOf<T>>];

/**
 * Function type for removing circular references from an object.
 *
 * @example
 * const cleaned = removeCircularReferences(obj);
 */
type IRemoveCicularReferences = Function<[string, any], any> ;

/**
 * Makes all properties of an object or array deeply optional.
 *
 * @template T - The object or array type
 *
 * @example
 * interface Example {
 *   id: number;
 *   nested: { value: string };
 * }
 * type PartialExample = DeepPartial<Example>;
 * // { id?: number; nested?: { value?: string } }
 */
type IDeepPartial<T> =
  T extends (...args: any[]) => any ? any :
  T extends Array<infer U> ? Array<IDeepPartial<U>> :
  T extends object ? {
    [K in keyof T]?: IDeepPartial<T[K]>|T[K]
  } :
  T;

export {
  ICommonFields as CommonFields,
  IRemoveCicularReferences as RemoveCicularReferences,
  IPrimitiveObject as PrimitiveObject,
  IObject as Object,
  IEntriesReturn as EntriesReturn,
  IGetTypeFromKey as GetTypeFromKey,
  IConcatStrIntoKeys as ConcatStrIntoKeys,
  IKeysOfType as KeysOfType,
  ICustomReturn as CustomReturn,
  ILockedParams as LockedParams,
  IDeepPartial as DeepPartial,
};
