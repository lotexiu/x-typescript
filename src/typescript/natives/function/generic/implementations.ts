import { TFunction, TRebindedFunction } from "./types";

function rebind<T extends TFunction>(fn: T): TRebindedFunction<T> {
	let newFn: any = fn 
	if ((fn as any)._rebind == undefined) {
		newFn = ((...args: any[]) => {
			return fn.apply(newFn.context, args);
		}) as any
	}
	newFn.__rebind = function(this: any, context: any, ...args: any[]) {
		this.args = this.args || [];
		this.args.push(...args);
		this.context = context;
		return this;
	}
	if (newFn.rebind == undefined) {
		newFn.rebind = newFn.__rebind;
	}
	return newFn;
}

export const _Function = {
	rebind
}

export type TUtilsFunction = typeof _Function;