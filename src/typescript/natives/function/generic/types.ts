import type { TArrayType } from "@tsn-array/generic/types";

/**
 * Represents a function type with specified argument and return types.
 * @example
 * type MyFunction = Function<[number, string], false, any, void>;
 * const fn: MyFunction = (num, str) => { console.log(num, str); };
 */
type TFunction<
  Types extends any[] = any[],
  RType = void,
  Inf extends boolean = false,
  InfType = any,
> = (...args: TArrayType<Types, Inf, InfType>) => RType

type TNativeFunction = Function

/**
 * Changes the return type of a function type.
 * @template Func - The function type
 * @template NewReturnType - The new return type
 * @example
 * type OriginalFunction = (a: number, b: string) => boolean;
 * type ModifiedFunction = ModifyReturnType<OriginalFunction, void>; // (a: number, b: string) => void
 */
type TModifyReturnType<Func extends (...args: any) => any, NewReturnType> = 
  Func extends (...args: infer Args) => any ? (...args: Args) => NewReturnType : never;

/**
 * Gets the parameters of a function type as a tuple.
 * @example
 * type ParametersExample = Parameters<(a: number, b: string) => void>; //[a: number, b: string]
 */
type TParameters<T> = T extends (...args: infer P) => any ? P : never;

/**
 * Gets the parameters of a constructor function type as a tuple.
 * @example
 * type ConstructorParametersExample = ConstructorParameters<new (a: number, b: string) => void>; // [number, string]
 */
type TConstructorParameters<T> = T extends abstract new (...args: infer P) => any ? P : never;

/**
 * Gets the return type of a function type.
 * @example
 * type ReturnTypeExample = ReturnType<() => string>; // string
 */
type TReturnType<T extends (...args: any) => any> = ReturnType<T>;

/**
 * Gets the instance type of a constructor function type.
 * @example
 * type InstanceTypeExample = InstanceType<new () => { a: number }>; // { a: number }
 */
type TInstanceType<T extends abstract new (...args: any) => any> = InstanceType<T>;


type TLambdaToFunction<T> =
  T extends (...args: infer A)=>infer R ? <T>(this: T, ...args: A) => R : never;

export type { 
  TFunction,
  TNativeFunction,
  TModifyReturnType,
  TParameters,
  TReturnType,
  TInstanceType,
  TConstructorParameters,
  TLambdaToFunction,
}