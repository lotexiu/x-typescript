type PropertyState = 'new' | 'updated' | 'deleted';

interface Property<T, Key extends keyof T = keyof T> {
	name: Key;
	value: T[Key];
	previousValue: T[Key];
	state: PropertyState;
}

type ProxyCallFunction<T,K extends keyof T> = (property: Property<T, K>) => void;

type ProxyOptions<T> = {
	onChanges?: (property: Property<T>) => void;
	properties?:{
		[	K in keyof T ]?: 	{
			proxyVariable?: boolean;
			onChanges?: (property: Property<T[K]>) => void;
			onSet?: (value: any) => void;
			onGet?: (value: any) => any;
		}
	}
} 

export {
	Property,
	PropertyState,
	ProxyOptions,
	ProxyCallFunction,
}