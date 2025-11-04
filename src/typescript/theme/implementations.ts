import Color from "colorjs.io"
import { MainColors, Theme, ThemeBuilder, ThemeRule } from "./type"

/**
 * Recommended to use space colors below for color mixing to get best results:
 * - a98rgb
 * - hsl
 * - hwb
 * - lch
 * - oklch
 */
function themeBuilder<
  const K extends string[],
  R extends ThemeRule<K>
>(mainColors: K, rules: R): ThemeBuilder<K,R> {
  return (colors: MainColors<K>): Theme<K, R> => {
    const theme: any = {};
    Object.entries(mainColors).forEach(([key, value]) => {
      theme[key] = new Color(value as string);
    });
    Object.entries(rules).forEach(([key, value]) => {
      if (typeof value === "function") {
        theme[key as keyof R] = value(theme) as any;
      } else {
        theme[key as keyof R] = new Color(value as string) as any;
      }
    });
    return theme;
  }
}

function basicMix(color1: Color, color2: Color, percentage: number) {
  return color1.mix(color2, percentage, {space: "lch", hue: "increasing"});
}

function hueRotate(color: Color, degrees: number) {
  return color.set("hue", (color.h + degrees) % 360);
}

const defaultBuilder = themeBuilder(
  ["background","foreground","primary","accent"], {
  secondary: ({background, primary}) => basicMix(background, primary, 0.5),
  card: ({background, foreground}) => basicMix(foreground, background, 0.1),
  popover: ({background, foreground}) => basicMix(foreground, background, 0.2),
  muted: ({foreground, background}) => basicMix(foreground, background, 0.5),
  border: ({background, foreground}) => basicMix(foreground, background, 0.3),
  input: ({primary, accent}) => basicMix(primary, accent, 0.4),
  ring: ({accent, primary}) => basicMix(accent, primary, 0.5),
  sidebar: ({background, primary}) => basicMix(background, primary, 0.2),
  sidebarPrimary: ({background, primary}) => basicMix(background, primary, 0.4),
  sidebarAccent: ({background, primary}) => basicMix(background, primary, 0.6),
  sidebarBorder: ({background, primary}) => basicMix(background, primary, 0.7),
  sidebarRing: ({background, primary}) => basicMix(background, primary, 0.8),
  destructive: ({accent}) => new Color('#ff0000').set('l', accent.l),
  chart1: ({primary}) => hueRotate(primary, 50),
  chart2: ({primary}) => hueRotate(primary, 90),
  chart3: ({primary}) => hueRotate(primary, 120),
  chart4: ({primary}) => hueRotate(primary, 180),
  chart5: ({primary}) => hueRotate(primary, 240),
})

const defaultTheme = defaultBuilder({
  background: "#2c0e63ff",
  foreground: "#fff",
  primary: "#00b7ffff",
  accent: "#ff9029ff",
});