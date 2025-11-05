import Color, { ColorTypes } from "colorjs.io"
import { MainColors, Theme, ThemeBuilder, ThemeRule } from "./type"
import { TObject, TRecord } from "@tsn-object/generic/types";

/**
 * Creates a theme schema with the specified main colors and rules.
 * @param mainColors - The main colors to include in the theme.
 * @param rules - The rules to apply to the theme.
 * @returns A function that takes the main colors and returns the themed colors.
 * Recommended to use space colors below for color mixing to get best results:
 * - a98rgb
 * - hsl
 * - hwb
 * - lch
 * - oklch
 */
function themeSchema<
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
        theme[key] = new Color(value(theme)).to('lch');
      } else {
        theme[key] = new Color(value).to('lch');
      }
    });
    return theme;
  }
}

// function basicMix()

function applyThemeToDocument<T extends Theme>(theme: TObject<T>) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key.toKebabCase()}`, value.toString());
  });
}

export const _Theme = {
  themeSchema,
  applyThemeToDocument,
}