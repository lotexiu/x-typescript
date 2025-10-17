import { Dispatch, ReactNode, useState } from "react";
import { ReactComponentProxy, WrappedComponent } from "./types";
import { proxyHandler } from "@tsn-object/proxy/ProxyHandler";
import { Property } from "@tsn-object/proxy/types";
import { Constructor } from "@tsn-class/generic/types";


abstract class ReactComponent<Props> {
	private dispatch!: Dispatch<any>
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

	updateView(): void {
		if (!this.dispatch) throw new Error(`Não é possível atualizar a "updateView" antes do componente ser montado.`);
		this.dispatch(Math.random());
	}

	abstract render(component: this) : ReactNode;

	static update(instance: ReactComponent<any>, source: any): void {
		Object.assign(instance, source)		
	}
}

function ReactWrapper<T extends Constructor<any>>(ComponentClass: T): WrappedComponent<T> {
	return ((props: any): ReactNode => {
		const newClassInstance: ReactComponentProxy = new ComponentClass(props)
		const [currentInstance, setInstance] = useState(newClassInstance);

		ReactComponent.update(currentInstance, {
			dispatch: useState({})[1]
		})

		if (Object.getPrototypeOf(currentInstance) != Object.getPrototypeOf(newClassInstance)) {
			setInstance(newClassInstance)
			newClassInstance.onInit();
		}

		currentInstance.setupHooks();
		return currentInstance.render();
	})
}

export {
	ReactWrapper,
	ReactComponent,
}