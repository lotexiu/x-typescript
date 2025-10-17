import { ProxyOptions } from "./types";

function set<T, P extends keyof T, V extends T[P]>(
	options: ProxyOptions<T>,
	target: T,
	property: P,
	value: V,
	receiver: any
): boolean {
	
	const previousValue = target[property];
	if (previousValue === value) return true;
	
	if (value) {
		switch (typeof value) {
			case 'object':
				const proxyProperty = createProxyProperty(property.toString()) as keyof T;
				if (options.properties && (options.properties[property]?.proxyVariable || options.properties[property]?.onChanges)) {
					target[proxyProperty] = proxyHandler(value, {
						onChanges: options.properties[property].onChanges as any
					})
				}
			break;
		}
	}
	
	target[property] = value;
	options.properties?.[property]?.onSet?.(value);
	options.onChanges?.({
		name: property,
		value: value,
		previousValue: previousValue,
		state: 'updated'
	})
	return true
}

function get<T, P extends keyof T, V extends T[P]>(
	options: ProxyOptions<T>,
	target: T,
	property: P
): V {
	let value: V = target[property] as V;
	if (value) {
		// Verifica se a propriedade é configurável antes de modificá-la
		const descriptor = Object.getOwnPropertyDescriptor(target, property);
		// Para propriedades não-configuráveis, retorna o valor original
		const isConfigurable = (!descriptor || descriptor.configurable !== false);
		// Verificar se o nome da propriedade é nativa em vez do valor.

		switch (typeof value) {
			case 'function':
				if (isConfigurable) value = (value as any).bind(target);
				break;
			case 'object':
				const proxyProperty = createProxyProperty(property.toString()) as keyof T;
				// proxy para objetos se a propriedade for configurável
				if (isConfigurable && (options.properties?.[property]?.proxyVariable || options.properties?.[property]?.onChanges)) {
					value = target[proxyProperty] = target[proxyProperty] as V || proxyHandler(value, {onChanges: options.properties[property].onChanges as any})
				}
				break;
		}
	}

	const returnedValue = options.properties?.[property]?.onGet?.(value);
	if (returnedValue !== undefined) return returnedValue;
	return value
}

function deleteProperty<T, P extends keyof T, V extends T[P]>(
	options: ProxyOptions<T>,
	target: T,
	property: P
): boolean {
	const previousValue = target[property];

	delete target[property];
	delete target[createProxyProperty(property.toString()) as keyof T];

	options.onChanges?.({
		name: property,
		value: undefined as V,
		previousValue: previousValue,
		state: 'deleted'
	})
	return true
}

function createProxyProperty<T extends (string|number)>(property: T) {
	return `__${property}Proxy` as const
}

function proxyHandler<T extends object>(
	targetObj: T,
	options: ProxyOptions<T> = {}
): T {
	const proxy = new Proxy(targetObj,{
		set: (set as any).bind(null, options),
		get: (get as any).bind(null, options),
		deleteProperty: (deleteProperty as any).bind(null, options)
	});
	(targetObj as any)[propertyVariable] = proxy;
	return proxy
}

function getProxy<T>(obj: T): T {
	return (obj as any)[propertyVariable] || obj;
}

const propertyVariable = '__proxy__';

export {
	proxyHandler,
	ProxyOptions,
	getProxy,
}