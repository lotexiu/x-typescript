type TConstructor<T> = new (...args: any[]) => T;

type TPrototype<T> = {
  constructor: TConstructor<T>;
} ;

type TClazz<T=null> = T extends null 
	? TConstructor<any> & Function & NewableFunction
	: TConstructor<T> & Function & NewableFunction;

export type {
	TConstructor,
	TPrototype,
	TClazz,
}