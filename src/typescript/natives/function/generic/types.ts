import { ArrayType } from "@tsn-array/generic/types";

/**
 * Represents a function type with specified argument and return types.
 * @example
 * type MyFunction = Function<[number, string], false, any, void>;
 * const fn: MyFunction = (num, str) => { console.log(num, str); };
 */
type IFunction<
  Types extends any[] = any[],
  RType = void,
  Inf extends boolean = false,
  InfType = any,
> = (...args: ArrayType<Types, Inf, InfType>) => RType

type INativeFunction = Function

/**
 * Changes the return type of a function type.
 * @template Func - The function type
 * @template NewReturnType - The new return type
 * @example
 * type OriginalFunction = (a: number, b: string) => boolean;
 * type ModifiedFunction = ModifyReturnType<OriginalFunction, void>; // (a: number, b: string) => void
 */
type IModifyReturnType<Func extends (...args: any) => any, NewReturnType> = 
  Func extends (...args: infer Args) => any ? (...args: Args) => NewReturnType : never;

/**
 * Gets the parameters of a function type as a tuple.
 * @example
 * type ParametersExample = Parameters<(a: number, b: string) => void>; //[a: number, b: string]
 */
type _IParameters<T> = T extends (...args: infer P) => any ? P : never;

/**
 * Gets the parameters of a constructor function type as a tuple.
 * @example
 * type ConstructorParametersExample = ConstructorParameters<new (a: number, b: string) => void>; // [number, string]
 */
type _IConstructorParameters<T extends abstract new (...args: any) => any> = ConstructorParameters<T>;

/**
 * Gets the return type of a function type.
 * @example
 * type ReturnTypeExample = ReturnType<() => string>; // string
 */
type _IReturnType<T extends (...args: any) => any> = ReturnType<T>;

/**
 * Gets the instance type of a constructor function type.
 * @example
 * type InstanceTypeExample = InstanceType<new () => { a: number }>; // { a: number }
 */
type _IInstanceType<T extends abstract new (...args: any) => any> = InstanceType<T>;

export { 
  IFunction as Function, 
  INativeFunction as NativeFunction,
  IModifyReturnType as ModifyReturnType, 
  _IParameters as Parameters, 
  _IReturnType as ReturnType, 
  _IInstanceType as InstanceType, 
  _IConstructorParameters as ConstructorParameters,
}