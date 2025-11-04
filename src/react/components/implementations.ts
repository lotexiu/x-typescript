import type { TConstructor } from "@tsn-class/generic/types";
import type { ReactNode } from "react";
import type { ReactComponentProxy, WrappedComponent } from "./ReactComponent/types";
import { ReactClientComponent } from "./ReactComponent/ReactClientComponent";

export function ReactWrapper<T extends TConstructor<any>>(ComponentClass: T): WrappedComponent<T> {
	return ((props: any): ReactNode => {
		const newClassInstance: ReactComponentProxy = new ComponentClass(props)
		
		if (newClassInstance instanceof ReactClientComponent) {
			const {useState} = require("react");
			const [currentInstance, setInstance] = useState(newClassInstance);
	
			Object.assign(currentInstance, {
				dispatch: useState({})[1]
			})

			if (Object.getPrototypeOf(currentInstance) != Object.getPrototypeOf(newClassInstance)) {
				setInstance(newClassInstance)
				newClassInstance.onInit();
			}

			currentInstance.setupHooks();
			return currentInstance.render();
		}
		return newClassInstance.render();
	})
}