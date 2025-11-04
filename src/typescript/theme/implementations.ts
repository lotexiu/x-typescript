import Color, { ColorTypes } from "colorjs.io"
import { MainColors, Theme, ThemeBuilder, ThemeRule } from "./type"

/**
 * Recommended to use space colors below for color mixing to get best results:
 * - a98rgb
 * - hsl
 * - hwb
 * - lch
 * - oklch
 */
export function themeBuilder<
  const K extends string[],
  R extends ThemeRule<K>
>(mainColors: K, rules: R): ThemeBuilder<K,R> {
  return (colors: MainColors<any>): Theme<K, R> => {
    const colorsNotFounded = mainColors.filter((key => !(key in colors)));
    if (colorsNotFounded.length > 0) {
      throw new Error(`Missing main colors: ${colorsNotFounded.join(", ")}`);
    }
    const theme: any = {};
    Object.entries(colors).forEach(([key, value]) => {
      theme[key] = new Color(value).to('lch');
    });
    Object.entries(rules).forEach(([key, value]) => {
      if (typeof value === "function") {
        theme[key] = value(theme)
      } else {
        theme[key] = new Color(value).to('lch');
      }
    });
    return theme;
  }
}