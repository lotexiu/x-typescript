import type { ReactNode } from "react";
import { proxyHandler } from "@tsn-object/proxy/ProxyHandler";
import type { Property } from "@tsn-object/proxy/types";


export abstract class ReactBaseComponent<Props=any> {
	readonly originalProps!: Props;

	props: Props;
	children?: ReactNode;

	constructor(
		props: Props
	) {
		this.originalProps = props;
		this.props = {...props};
		this.children = (props as any).children;
		

		const proxy: this = proxyHandler(this, {
			allProxy: true,
			onChanges: this.onChanges.bind(this),
			properties: {
				props: {
					onChanges: this.onPropsChange.bind(this) as any,
				},
				render: {
					onGet(value) {return value.bind(proxy)},
				}
			}
		})
		return proxy
	}

	onInit(): void {};
	setupHooks(): void {};
	onChanges(property: Property<this>): void {}
	onPropsChange(properties: Property<this['props']>): void {}

	/**
	 * Render the component
	 * Any changes on `this` will trigger onChanges
	 */
	abstract render() : ReactNode;
}