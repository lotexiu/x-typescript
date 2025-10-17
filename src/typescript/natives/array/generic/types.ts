import { Never } from "@tsi/types";

/**
 * Returns the first element of an array.
 * @example
 * type FirstElement = First<[number, string, boolean]>; // number
 */
type IFirst<T extends any[], _nv extends Never = never> = T extends [infer Rest, ...infer Last] ? Rest : _nv;

/**
 * Returns the last element of an array.
 * @example
 * type LastElement = Last<[number, string, boolean]>; // boolean
 */
type ILast<T extends any[], _nv extends Never = never> = T extends [...infer Rest, infer Last] ? Last : _nv;

/**
 * Represents an array type.
 * @example
 * type NumberArray = ArrayType<number>; // number[]
 * type MixedArray = ArrayType<[number, string]>; // [number, string]
 */
type IArrayType<
  Types = any[],
  Inf extends boolean = false,
  InfType = Never,
  _nv extends Never = never
> = [
  ...Types extends any[] ? Types : [Types],
  ...Inf extends true ? 
    InfType extends Never ?
      Types extends any[] ? 
        ILast<Types, _nv>[] : Types[] : 
      InfType[] : []
]

/**
 * Defines a value or a read-only array-like structure with a `.length` property and indexed values.
 * @example
 * type ArrayLikeString = ArrayLike<string>; // { readonly length: number; readonly [index: number]: string; }
 */
type _IArrayLike<T> = ArrayLike<T>;

/**
 * Extracts the values from a tuple or array type.
 * @example
 * type Values = ExtractValues<[1, 2, 3]>; // 1 | 2 | 3
 */
type IExtractValues<T extends readonly any[]> = T[number];

/**
 * Builds an array of a given length and type.
 * @example
 * type FiveNumbers = BuildArray<5, [], number>; // number[] with length 5
 */
type IBuildArray<
  Length extends number,
  Acc extends unknown[] = [],
  Type = any
> = Acc['length'] extends Length ? Acc : IBuildArray<Length, [...Acc, Type], Type>;

/**
 * Represents a tuple of two types.
 * @example
 * type PairExample = Pair<string, number>; // [string, number]
 */
type IPair<T=any,T2=any> = [T, T2]

/**
 * Gets the item type of an array.
 * @example
 * type Item = ItemType<number[]>; // number
 */
type IItemType<T> = T extends (infer U)[] ? U : never;

/**
 * Represents a standard array type.
 * @example
 * type MyArray = Array<string>; // string[]
 */
type IArray<T=any> = Array<T>

export { 
  IFirst as First, 
  ILast as Last, 
  IArrayType as ArrayType,
  _IArrayLike as ArrayLike,
  IExtractValues as ExtractValues,
  IBuildArray as BuildArray,
  IPair as Pair,
  IItemType as ItemType,
  IArray as Array,
}