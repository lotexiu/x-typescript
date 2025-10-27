type IConstructor<T> = new (...args: any[]) => T;

type IPrototype<T> = {
  constructor: IConstructor<T>;
} ;

type IAnyClass<T=null> = T extends null 
	? IConstructor<any> & Function & NewableFunction
	: IConstructor<T> & Function & NewableFunction & T;

export {
	IConstructor as Constructor,
	IPrototype as Prototype,
	IAnyClass as AnyClass
}