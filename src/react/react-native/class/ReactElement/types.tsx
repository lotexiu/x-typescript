import { DimensionValue, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ReactComponent } from "./ReactElement";
import { ReactNode } from "react";

export type BadTyping = (string|number|undefined)

export type RawStyleProps = ViewStyle | TextStyle | ImageStyle

export type StyleProps<T=RawStyleProps> = T extends object ? {
	[K in keyof T]?: BadTyping extends T[K] ? Exclude<DimensionValue, object> : T[K] 
} : never

export type AddStyles<Style> = (StyleProps | Style | StyleProp<RawStyleProps>)[] 

export type Constructor<T> = new (...args: any[]) => T;

export type PropsOf<T> = T extends new (props: infer P) => any ? P : never;

export type WrappedComponent<T> = (props: PropsOf<T>) => ReactNode | Promise<ReactNode>

export interface ReactComponentProxy extends ReactComponent<any> {
	render: () => React.JSX.Element;
}