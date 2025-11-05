import { TAsArray } from "@tsn-array/generic/types"
import type { TRecord } from "@tsn-object/generic/types"
import type Color from "colorjs.io"
import type { ColorTypes } from "colorjs.io"

type MainColors<T=any, R=ColorTypes> = { [key in TAsArray<T>[number]]: R }

type ColorBuilder<K> = (mainColors: MainColors<K,Color>, darkTheme: boolean) => Color

type ThemeRule<K> = {
  [key: string]: ColorBuilder<K> | ColorTypes
}

type Theme<K=any, R = any> = TRecord<K, Color> & TRecord<R, Color>

/**
 * A function that takes the main colors and returns the themed colors.
 * @param mainColors - The main colors to use for the theme.
 * @returns The themed colors.
 */
type ThemeBuilder<K, R = any> = (mainColors: MainColors<K>) => Theme<K, R>

export {
  MainColors,
  ColorBuilder,
  ThemeRule,
  ThemeBuilder,
  Theme,
}