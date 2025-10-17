import { ReactComponent } from "./ReactComponent";
import { ReactNode } from "react";

export type BadTyping = (string|number|undefined)

export type PropsOf<T> = T extends new (props: infer P) => any ? P : never;

export type WrappedComponent<T> = (props: PropsOf<T>) => ReactNode | Promise<ReactNode>

export interface ReactComponentProxy extends ReactComponent<any> {
	render: () => React.JSX.Element;
}