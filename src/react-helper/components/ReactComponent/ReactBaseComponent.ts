import { ReactNode } from "react";
import { proxyHandler } from "@tsn-object/proxy/ProxyHandler";
import { Property } from "@tsn-object/proxy/types";


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
			onChanges: this.onChanges.bind(this),
			properties: {
				props: {
					onChanges: this.onPropsChange.bind(this) as any,
				},
				render: {
					onGet(value) {return value.bind(this,proxy)},
				}
			}
		})
		return proxy
	}

	onInit(): void {};
	setupHooks(): void {};
	onChanges(property: Property<this>): void {}
	onPropsChange(properties: Property<this['props']>): void {}

	abstract render(component: this) : ReactNode;
}